import * as tslib_1 from "tslib";
import { RouterModule } from '@angular/router';
import { CompleteComponent } from 'app/complete/complete.component';
import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routeList } from './shared/models';
var routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AppComponent
    },
    {
        path: "" + routeList.application.path,
        loadChildren: './iawapplication.module#ApplicationModule'
    },
    {
        path: "" + routeList.complete,
        component: CompleteComponent
    },
    // TODO: enable again after fixing the routing
    { path: '**', component: PageNotFoundComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes
                // { enableTracing: true } // <-- debugging purposes only
                )
            ],
            exports: [RouterModule],
            declarations: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map