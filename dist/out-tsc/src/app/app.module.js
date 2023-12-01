"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const forms_1 = require("@angular/forms");
const app_routes_1 = require("./app.routes");
const app_component_1 = require("./app.component");
const search_form_component_1 = require("./components/search-form/search-form.component");
const character_component_1 = require("./components/character/character.component");
const api_service_1 = require("./services/api.service");
const planet_component_1 = require("./components/planet/planet.component");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, core_1.NgModule)({
        declarations: [
            app_component_1.AppComponent,
            search_form_component_1.SearchFormComponent,
            character_component_1.CharacterComponent,
            planet_component_1.PlanetComponent
        ],
        imports: [
            app_routes_1.AppRoutesModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpClientModule,
            forms_1.ReactiveFormsModule
        ],
        providers: [
            api_service_1.ApiService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
