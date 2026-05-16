import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from './services/api.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchType: string;
  searchResult: any[];
  isLoading: boolean;
  errorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const {searchType, query} = params;
      if (searchType && query) {
        this.isLoading = true;
        this.errorMessage = undefined;
        this.searchType = searchType;
        this.apiService.search(searchType, query).subscribe(
          response => {
            this.searchResult = Array.isArray(response.results) ? response.results : [];
            this.isLoading = false;
          },
          () => {
            this.searchResult = [];
            this.errorMessage = 'Search failed.';
            this.isLoading = false;
          }
        );
      }
    });
  }

  isNotFound(searchResult: any[], isLoading: boolean) {
    return searchResult && !searchResult.length && !isLoading && !this.errorMessage;
  }
}
