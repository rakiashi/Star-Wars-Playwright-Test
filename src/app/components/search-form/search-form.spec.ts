import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let fixture: ComponentFixture<SearchFormComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    fixture.detectChanges();
  });

  it('should select people by default', () => {
    expect(fixture.componentInstance.searchForm.value.searchType).toBe('people');
  });

  it('should be able to select planet radio', () => {
    fixture.componentInstance.searchForm.patchValue({ searchType: 'planets' });

    expect(fixture.componentInstance.searchForm.value.searchType).toBe('planets');
  });

  it('should not search with empty text', () => {
    fixture.componentInstance.searchForm.patchValue({ query: '' });

    fixture.componentInstance.search();

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate with the correct query params when submit is valid', () => {
    fixture.componentInstance.searchForm.setValue({
      searchType: 'people',
      query: 'Luke Skywalker',
    });

    fixture.componentInstance.search();

    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: {
        searchType: 'people',
        query: 'Luke Skywalker',
      },
    });
  });
});
