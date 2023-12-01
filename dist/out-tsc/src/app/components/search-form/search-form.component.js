"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFormComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
const router_2 = require("@angular/router");
let SearchFormComponent = class SearchFormComponent {
    constructor(activatedRoute, formBuilder, router) {
        this.activatedRoute = activatedRoute;
        this.formBuilder = formBuilder;
        this.router = router;
        this.defaultSearchType = 'people';
    }
    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            searchType: [this.defaultSearchType],
            query: ['', [forms_1.Validators.required]],
        });
        this.activatedRoute.queryParams.subscribe(params => {
            const { searchType, query } = params;
            this.searchForm.setValue({
                searchType: searchType || this.defaultSearchType,
                query: query || '',
            });
        });
    }
    search() {
        const { searchType, query } = this.searchForm.value;
        if (this.searchForm.valid) {
            this.router.navigate([], {
                queryParams: {
                    searchType,
                    query,
                },
            });
        }
    }
};
SearchFormComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-search-form',
        templateUrl: './search-form.component.html',
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        forms_1.FormBuilder,
        router_2.Router])
], SearchFormComponent);
exports.SearchFormComponent = SearchFormComponent;
