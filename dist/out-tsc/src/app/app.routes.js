"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutesModule = void 0;
const router_1 = require("@angular/router");
const app_component_1 = require("./app.component");
const routes = [
    {
        path: '**',
        component: app_component_1.AppComponent,
    },
];
exports.AppRoutesModule = router_1.RouterModule.forRoot(routes);
