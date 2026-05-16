import { Locator } from "@playwright/test";

export const visualTolerance = {
  animations: "disabled" as const,
  caret: "hide" as const,
  maxDiffPixelRatio: 0.01,
  threshold: 0.2,
};

export const buildMaskedVisualOptions = (mask: Locator[] = []) => ({
  ...visualTolerance,
  mask,
});
