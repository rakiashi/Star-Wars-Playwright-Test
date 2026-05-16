import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { appConfig, getDefaultSearchType, isSearchTypeEnabled, SearchType } from '../../config/app.config';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent implements OnInit {

  searchForm: FormGroup;
  features = appConfig.features;
  defaultSearchType = getDefaultSearchType();

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchType: [ this.defaultSearchType ],
      query: [ '', [Validators.required] ],
    });

    this.activatedRoute.queryParams.subscribe(params => {
      const {searchType, query}  = params;
      const resolvedSearchType = isSearchTypeEnabled(searchType as SearchType)
        ? searchType
        : this.defaultSearchType;

      this.searchForm.setValue({
        searchType: resolvedSearchType || this.defaultSearchType,
        query: query || '',
      });
    });
  }

  search(): void {
    const {searchType, query} = this.searchForm.value;
    if (this.searchForm.valid && isSearchTypeEnabled(searchType)) {
      this.router.navigate([], {
        queryParams: {
          searchType,
          query,
        },
      });
    }
  }
}
