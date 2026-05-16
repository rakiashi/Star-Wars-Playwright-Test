# Star Wars Playwright Test Framework

This project is an Angular Star Wars search app with a Playwright-based E2E framework. The app searches SWAPI through `ApiService.search(searchType, query)` and renders either character or planet result components.

The testing goal is to keep the framework readable, scalable, and deterministic:

- Page objects own navigation and user actions.
- Component objects own component-level locators and assertions.
- Tests describe user journeys and business intent.
- Network mocks are based on the real service boundary, not on incidental UI timing.

## Project Shape

```text
playwright.config.ts                       # Playwright runner config, projects, and webServer
playwright-e2e/tests/                      # Priority-based UI scenarios
playwright-e2e/api/                        # API contract scenarios
performance/k6/                            # K6 performance smoke tests
integration-utils/fixtures/base.page.ts    # Custom Playwright fixtures
integration-utils/components/              # Browser-level component objects
integration-utils/env/                     # Runtime environment options
integration-utils/feature-flags/           # Feature toggle support
integration-utils/mocks/                   # Service-based network mocks
integration-utils/contracts/               # Zod API contract schemas
integration-utils/page/searchPage.ts       # Current search page object
integration-utils/test-data/data.json      # Test data used by E2E tests
integration-utils/visual/                  # Visual snapshot defaults
src/app/config/app.config.ts               # App-owned feature configuration
src/app/services/api.service.ts            # SWAPI service boundary
src/app/components/search-form/            # Search form Angular component
src/app/components/character/              # Character result Angular component
src/app/components/planet/                 # Planet result Angular component
```

## Run Locally

```bash
npm i
npm start
```

Run Angular unit/component tests:

```bash
npm test
```

Run Playwright full regression in headless mode:

```bash
npm run e2e-fullregression-runner-test-headless
```

Run Playwright headed:

```bash
npm run e2e-fullregression-runner-test
```

Run priority flows:

```bash
npm run e2e:p0
```

Run locally with mocked SWAPI responses:

```bash
npm run e2e:mock
```

Run accessibility checks:

```bash
npm run a11y
```

Run mobile P0 checks:

```bash
npm run e2e:mobile
```

Run Firefox/WebKit P0 checks:

```bash
npm run e2e:cross-browser
```

Run against a development environment with the real API:

```bash
ENV=development BASE_URL=http://localhost:4200 API_MODE=real npm run e2e:real
```

Run API contract tests:

```bash
npm run api:contract
```

Run visual regression tests:

```bash
npm run visual
```

Update visual baselines intentionally:

```bash
npm run visual:update
```

Run K6 performance smoke tests:

```bash
npm run perf:k6
```

`perf:k6` expects the `k6` binary to be installed on the machine. The bundled public SWAPI scripts default `IGNORE_HTTPS_ERRORS` to `true` because the public endpoint can present an expired certificate; set `IGNORE_HTTPS_ERRORS=false` for controlled environments where TLS should be enforced.

## Runtime Capabilities

The framework supports environment-driven execution:

| Capability | Env var | Default |
| --- | --- | --- |
| Target app environment | `ENV=local\|development\|L6` | `local` |
| UI base URL override | `BASE_URL=http://localhost:4200` | From `env.config.json` |
| API base URL override | `API_BASE_URL=https://swapi.dev/api` | From `env.config.json` |
| Mock or real API mode | `API_MODE=mock\|real` | `mock` |
| Browser mode | `HEADLESS=true\|false` | `true` |
| API TLS bypass | `IGNORE_HTTPS_ERRORS=true\|false` | `false` |
| People flow flag | `FEATURE_PEOPLE_SEARCH=true\|false` | `true` |
| Planet flow flag | `FEATURE_PLANET_SEARCH=true\|false` | `true` |
| Negative flow flag | `FEATURE_NEGATIVE_SEARCH=true\|false` | `true` |
| API contract flag | `FEATURE_API_CONTRACT=true\|false` | `true` |
| Performance flag | `FEATURE_PERFORMANCE=true\|false` | `false` |
| Visual regression flag | `FEATURE_VISUAL_REGRESSION=true\|false` | `true` |
| Visual max diff ratio | `VISUAL_MAX_DIFF_PIXEL_RATIO=0.05` | `0.01` local, `0.05` CI |
| Visual threshold | `VISUAL_THRESHOLD=0.25` | `0.2` local, `0.25` CI |

Local mocked runs use Playwright `page.route()` to fulfill SWAPI calls before the UI triggers them. Development runs use the configured real API and skip route mocks.

People and planet feature flags default from the app-owned config in `src/app/config/app.config.ts`. The test layer reads the same config, then allows env overrides. This keeps test effort aligned to product capability while still letting CI deliberately include or exclude flows.

## Accessibility Testing

Accessibility tests live in `playwright-e2e/tests/accessibility.spec.ts` and use `@axe-core/playwright`.

Current coverage:

- Default search page.
- Search results page after deterministic mocked data is rendered.

The accessibility gate already exposed and fixed a real issue: Bootstrap's default primary button color failed WCAG AA color contrast, so the app now overrides `.btn-primary` with a darker accessible blue in `src/styles.css`.

## Browser And Viewport Coverage

Playwright projects now include:

- `ui-mock`: Chromium desktop functional flows.
- `ui-mock-mobile`: Pixel 5 P0 flows.
- `ui-mock-firefox`: Firefox P0 flows.
- `ui-mock-webkit`: WebKit P0 flows.

Local `e2e:mock` intentionally excludes `@Visual` and `@A11y`; those are heavier gates and run through `visual` and `a11y`. CI also keeps them separate so failures produce focused artifacts.

## Error-State Coverage

Service mocks now cover:

- Happy-path SWAPI responses.
- Empty search responses.
- HTTP failure responses.
- Malformed response shapes.

The app now renders `data-testid="api-error"` with `Search failed.` for API failures, and treats malformed response bodies as empty results instead of crashing.

## CI And Artifact Policy

GitHub Actions is split into independent gates:

- Angular unit/component tests.
- Playwright P0 mocked UI tests.
- Accessibility tests.
- API contract tests.
- Visual regression tests.
- K6 performance smoke tests.

Artifact policy:

- Functional and accessibility Playwright reports are retained for 7 days.
- API contract reports are retained for 7 days.
- Visual reports and diffs are retained for 14 days.
- Failure screenshots, videos, traces, and visual diffs are uploaded from `playwright-report/` and `test-results/`.

## Visual Regression Testing

Visual tests live in `playwright-e2e/tests/visual-regression.spec.ts` and run only in `API_MODE=mock`, because visual baselines should never depend on live third-party data.

The current visual layer covers:

- Default search page baseline.
- People search result page baseline.
- Planet result card component baseline.

The framework uses:

- `toHaveScreenshot()` for full page/container and component snapshots.
- `mask` for dynamic/user-entered regions such as the search input.
- `animations: "disabled"` and `caret: "hide"` to reduce noise.
- `maxDiffPixelRatio: 0.01` and `threshold: 0.2` locally for strict developer checks.
- `maxDiffPixelRatio: 0.05` and `threshold: 0.25` in CI to absorb Linux/macOS font rendering differences while still catching meaningful layout regressions.
- `@Visual` tag so visual checks can run separately from fast P0 functional checks.

Rules for maintaining snapshots:

- Use `npm run visual` in CI/check mode.
- Use `npm run visual:update` only after a deliberate UI change.
- Review changed PNG baselines like source code. A visual snapshot update without a matching product/design reason is a bug until proven otherwise.
- Keep visual assertions few and high-value. Snapshotting every minor state creates noisy tests and expensive reviews.

## Current Framework Review

The existing framework has a good start:

- `base.page.ts` exposes a typed `searchPage` fixture.
- `searchPage.ts` centralizes repeated locators and page navigation.
- The tests cover default search UI, people search, planet search, invalid searches, and partial matching.
- `ApiService` is covered with Angular `HttpTestingController` tests.

Recommended improvements:

- Replace XPath-heavy selectors with user-facing locators first: `getByRole`, `getByLabel`, `getByTestId`, and `locator(...).filter(...)` where needed.
- Remove fixed waits such as `waitForTimeout(5000)` and rely on Playwright auto-waiting plus web-first assertions.
- Keep assertions out of broad page objects. `SearchPage` should not contain generic assertion helpers such as `expectActualContainsExpected`.
- Split UI areas into component objects: `SearchFormComponent`, `CharacterCardComponent`, `PlanetCardComponent`, and optionally `SearchResultsComponent`.
- Add API route mocks for `https://swapi.dev/api/people/` and `https://swapi.dev/api/planets/` so E2E tests are stable and independent of the external service.
- Keep API contract tests separate from UI tests so live service drift is detected intentionally.
- Use `@P0`, `@P1`, and `@FullRegression` tags to run risk-based subsets.
- Keep `@A11y` and `@Visual` as separate gates because they are slower and produce different artifacts.

## Senior-Level Architecture

Use a layered Playwright model:

```text
tests
  -> page object
      -> component objects
          -> locators + component assertions
  -> service mocks
      -> route fixtures aligned to Angular services
```

### 1. Page Object Model

Playwright's Page Object Model guidance is still useful for large suites: a page object represents a part of the application and centralizes selectors and reusable user actions. In this project, `SearchPage` should represent the top-level search page only.

Recommended `SearchPage` responsibilities:

- Navigate to the app.
- Expose top-level page regions/components.
- Coordinate high-level user workflows, such as `searchForPeople(query)` or `searchForPlanets(query)`.
- Avoid direct assertions except truly page-level checks such as URL or page title, and even those can live in a page assertion object if the suite grows.

Example direction:

```ts
export class SearchPage {
  readonly searchForm: SearchFormComponent;
  readonly characters: CharacterCardComponent;
  readonly planets: PlanetCardComponent;

  constructor(private readonly page: Page) {
    this.searchForm = new SearchFormComponent(page);
    this.characters = new CharacterCardComponent(page);
    this.planets = new PlanetCardComponent(page);
  }

  async visit() {
    await this.page.goto(ConfigReader.getEnvVars().BASE_URL);
  }

  async searchPeople(query: string) {
    await this.searchForm.selectPeople();
    await this.searchForm.search(query);
  }

  async searchPlanets(query: string) {
    await this.searchForm.selectPlanets();
    await this.searchForm.search(query);
  }
}
```

### 2. Component Testing Capabilities

Playwright Component Testing currently provides an experimental `mount` fixture for React and Vue through `@playwright/experimental-ct-react` and `@playwright/experimental-ct-vue`. It supports mounting a component in a real browser, passing props/events, using hooks, and handling network requests through the component-test router fixture.

Because this project is Angular, the practical component strategy is:

- Keep Angular component tests in `*.spec.ts` with Angular `TestBed` for isolated component and service behavior.
- Use Playwright E2E component objects to model rendered Angular components in the browser.
- If the project later moves to a Playwright-supported component stack, add a separate `playwright-ct.config.ts` and component specs using `mount`.

For this codebase, the best immediate component split is:

```text
integration-utils/components/searchForm.component.ts
integration-utils/components/characterCard.component.ts
integration-utils/components/planetCard.component.ts
integration-utils/components/notFound.component.ts
```

Each file should expose locators and assertions for one rendered component.

### 3. Assertions Belong With Component Objects

Use Playwright web-first assertions such as `await expect(locator).toBeVisible()`, `toHaveText()`, `toBeChecked()`, and `toContainText()`. These assertions auto-retry until the expected UI state is reached, which is less flaky than manually reading `textContent()` and asserting synchronously.

Current pattern to avoid:

```ts
await searchPage.expectActualContainsExpected(
  searchPage.cardTitleByIndex(1),
  data.people.LukeSkywalker.title
);
```

Preferred pattern:

```ts
await searchPage.characters.expectCardToMatch(0, {
  name: 'Luke Skywalker',
  gender: 'male',
  birthYear: '19BBY',
  eyeColor: 'blue',
  skinColor: 'fair',
});
```

The assertion belongs to `CharacterCardComponent` because that component knows how a character is rendered. The test remains business-readable, while the page object stays focused on page workflow.

Example component object:

```ts
export class CharacterCardComponent {
  constructor(private readonly page: Page) {}

  card(index = 0) {
    return this.page.getByTestId('card-body').nth(index);
  }

  async expectCardToMatch(index: number, expected: CharacterExpected) {
    const card = this.card(index);
    await expect(card.getByTestId('card-title')).toHaveText(expected.name);
    await expect(card.getByTestId('row-1')).toContainText(expected.gender);
    await expect(card.getByTestId('row-2')).toContainText(expected.birthYear);
    await expect(card.getByTestId('row-3')).toContainText(expected.eyeColor);
    await expect(card.getByTestId('row-4')).toContainText(expected.skinColor);
  }
}
```

This keeps assertions close to the component markup and makes future UI changes cheaper.

## Service-Based Mocks

`ApiService` is the only app service that calls SWAPI:

```ts
GET https://swapi.dev/api/{searchType}/?search={query}
```

Playwright mocks should be aligned with this service contract:

- `people` searches return character-shaped SWAPI responses.
- `planets` searches return planet-shaped SWAPI responses.
- Empty result cases return `{ count: 0, results: [] }`.
- Mocks should be registered before `page.goto()` or before the action that triggers the request.

Recommended utility:

```ts
type SwapiSearchType = 'people' | 'planets';

export async function mockSwapiSearch(
  page: Page,
  searchType: SwapiSearchType,
  results: unknown[]
) {
  await page.route(`https://swapi.dev/api/${searchType}/**`, async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: {
        count: results.length,
        next: null,
        previous: null,
        results,
      },
    });
  });
}
```

Example usage:

```ts
test('searches for Luke without calling real SWAPI', async ({ page, searchPage }) => {
  await mockSwapiSearch(page, 'people', [
    {
      name: 'Luke Skywalker',
      gender: 'male',
      birth_year: '19BBY',
      eye_color: 'blue',
      skin_color: 'fair',
    },
  ]);

  await searchPage.visit();
  await searchPage.searchPeople('Luke');
  await searchPage.characters.expectCardToMatch(0, {
    name: 'Luke Skywalker',
    gender: 'male',
    birthYear: '19BBY',
    eyeColor: 'blue',
    skinColor: 'fair',
  });
});
```

For larger suites, move common route mocks into fixtures:

```ts
export const test = base.extend<{
  mockSwapiPeople: (results: unknown[]) => Promise<void>;
  mockSwapiPlanets: (results: unknown[]) => Promise<void>;
}>({
  mockSwapiPeople: async ({ page }, use) => {
    await use(results => mockSwapiSearch(page, 'people', results));
  },
  mockSwapiPlanets: async ({ page }, use) => {
    await use(results => mockSwapiSearch(page, 'planets', results));
  },
});
```

Use HAR replay only when the team wants to preserve a realistic third-party API recording. For the current app, explicit JSON route mocks are simpler and easier to review.

## Locator Strategy

Prefer locators in this order:

1. Accessible role and name: `page.getByRole('button', { name: 'Search' })`.
2. Labels: `page.getByLabel('Query')`.
3. Stable test ids: `page.getByTestId('card-title')`.
4. CSS selectors scoped inside a component.
5. XPath only when there is no better stable or accessible option.

Suggested replacements:

```ts
page.locator('//h1')                    -> page.getByRole('heading', { name: 'The Star Wars Search' })
page.locator('//input[@id="query"]')    -> page.getByLabel('Query')
page.locator('//input[@id="people"]')   -> page.getByLabel('People')
page.locator('//button[@type="submit"]')-> page.getByRole('button', { name: 'Search' })
```

This makes tests read closer to the user experience and improves resilience when the DOM structure changes.

## Recommended Test Split

### Angular Unit and Component Tests

Use Angular/Karma specs for:

- `ApiService` URL and query parameter behavior.
- `SearchFormComponent` form validation and router navigation.
- `CharacterComponent` and `PlanetComponent` input rendering.
- `AppComponent.isNotFound()` and loading behavior.

### Playwright E2E Tests

Use Playwright for:

- Real browser journeys through search form, routing, and rendered results.
- Accessibility-facing behavior: labels, roles, and visible states.
- Cross-browser checks if needed.
- Network failure, empty result, and slow response behavior through route mocks.

### API Contract Tests

Use Playwright API tests for the service contract that the UI depends on:

- `GET /people/?search=Luke Skywalker` must return `name`, `gender`, `birth_year`, `eye_color`, and `skin_color`.
- `GET /planets/?search=Alderaan` must return `name`, `population`, `climate`, and `gravity`.

These tests live in `playwright-e2e/api`, intentionally run against the real configured API, and validate responses with Zod schemas from `integration-utils/contracts`.

### K6 Performance Tests

K6 covers lightweight service performance smoke checks for SWAPI search endpoints. The current script checks:

- People search availability and result shape.
- Planet search availability and result shape.
- Error-rate threshold below 1%.
- 95th percentile response time below 1000 ms.

### Playwright Visual Tests

Use Playwright visual tests for:

- Layout regressions that functional assertions miss.
- Reusable rendered components such as result cards.
- Critical user-facing screens after deterministic mocked data is loaded.

Do not run visual snapshots against `API_MODE=real`; live data, network timing, fonts, and third-party changes make baselines noisy.

### Playwright Component Testing

Use official Playwright Component Testing only where the frontend stack is supported. As of the current Playwright docs, official experimental CT packages are for React and Vue. For this Angular project, keep component isolation in Angular TestBed and use Playwright component objects for browser-level rendering assertions.

## Ruthless Framework Gaps

The framework is much stronger now, but a senior test framework is never "done." These are the next concepts worth implementing, in priority order:

1. Test data builders: replace static fixtures with typed builders for people, planets, empty responses, slow responses, API errors, null fields, and very long strings.
2. Network abort and timeout flows: HTTP `500` and malformed responses are covered, but true aborted requests and slow responses should be explicit.
3. Mobile visual baselines: mobile functional P0 exists; mobile visual snapshots should be added only after desktop visual stability is boring.
4. Cross-browser execution in local verification: projects exist, but local Firefox/WebKit runs require installed Playwright browsers.
5. Auth/session fixture pattern: not needed for this app today, but essential once protected routes exist.
6. Storage state and user persona fixtures: add when the app has login, roles, or user-specific permissions.
7. Mutation/chaos mocks: test missing fields, null values, extra fields, huge result sets, and very long strings to expose weak UI assumptions.
8. Component harness consistency: align Angular TestBed specs and Playwright component objects around shared expected-data types.
9. Flake management: add quarantine tags, historical flake tracking, and a no-silent-skip policy.
10. Lint/typecheck gate: add `tsc --noEmit` or a dedicated typecheck script so framework code fails before runtime.
11. Environment governance: separate local, mocked, development, staging, and production-safe profiles with explicit allowed test types.
12. API virtualization: move from inline mocks to reusable route handlers or a mock server when service contracts grow.
13. Performance budgets by endpoint and flow: split K6 smoke, load, soak, and spike tests instead of one generic script.
14. Release risk map: formally define which tags block PRs, nightly builds, staging deployments, and releases.

## References

- [Playwright Page Object Models](https://playwright.dev/docs/pom)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Mock APIs](https://playwright.dev/docs/mock)
- [Playwright Network](https://playwright.dev/docs/network)
- [Playwright Components](https://playwright.dev/docs/test-components)
