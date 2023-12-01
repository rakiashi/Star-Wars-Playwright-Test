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
exports.AppComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const api_service_1 = require("./services/api.service");
let AppComponent = class AppComponent {
    constructor(activatedRoute, apiService) {
        this.activatedRoute = activatedRoute;
        this.apiService = apiService;
    }
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            const { searchType, query } = params;
            if (searchType && query) {
                this.isLoading = true;
                this.searchType = searchType;
                this.apiService.search(searchType, query).subscribe(response => {
                    this.searchResult = response.results;
                    this.isLoading = false;
                });
            }
        });
    }
    isNotFound(searchResult, isLoading) {
        return searchResult && !searchResult.length && !isLoading;
    }
};
AppComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        api_service_1.ApiService])
], AppComponent);
exports.AppComponent = AppComponent;
