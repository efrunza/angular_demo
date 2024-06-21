import * as tslib_1 from "tslib";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MsalModule, MsalService } from '@azure/msal-angular';
import { MSAL_CONFIG } from '@azure/msal-angular/dist/msal.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from 'environments/environment';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { IapHttpInterceptorService } from 'shared/services/iap-http-interceptor.service';
import { ServerErrorInterceptor } from 'shared/services/server-error-interceptor.service';
import { AppComponent } from './app.component';
import { CompleteComponent } from './complete/complete.component';
import { MsalComponent } from './msal/msal.component';
import { rootEffects } from './store/effects';
import { reducers } from './store/reducers';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from 'shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { metaReducers } from 'app/store/meta-reducers';
import { AppService } from './app.service';
import { ApplicationService } from './iawapplication.service';
import { getMsalConfigs } from 'app/utils';
import { GlobalErrorHandler } from 'shared/services';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.ngDoBootstrap = function (ref) {
        if (window !== window.parent && !window.opener) {
            ref.bootstrap(MsalComponent);
        }
        else {
            //this.router.resetConfig(RouterModule);
            ref.bootstrap(AppComponent);
        }
    };
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                CompleteComponent,
                MsalComponent,
                PageNotFoundComponent
            ],
            imports: [
                AppRoutingModule,
                SharedModule,
                BrowserAnimationsModule,
                BrowserModule,
                ServiceWorkerModule.register('ngsw-worker.js', {
                    enabled: environment.production
                }),
                MsalModule,
                LoggerModule.forRoot({
                    level: !environment.production ? NgxLoggerLevel.LOG : NgxLoggerLevel.OFF,
                    serverLogLevel: NgxLoggerLevel.OFF
                }),
                EffectsModule.forRoot(rootEffects),
                StoreModule.forRoot(reducers, {
                    metaReducers: metaReducers
                }),
                !environment.production
                    ? StoreDevtoolsModule.instrument({
                        maxAge: 25,
                        logOnly: environment.production
                    })
                    : []
            ],
            providers: [
                MsalService,
                AppService,
                // This service has to be provided in app module only in order for it to be a singleton instance which is very important
                ApplicationService,
                {
                    provide: HTTP_INTERCEPTORS,
                    multi: true,
                    useClass: IapHttpInterceptorService
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ServerErrorInterceptor,
                    multi: true
                },
                {
                    provide: MSAL_CONFIG,
                    useFactory: getMsalConfigs
                },
                {
                    provide: ErrorHandler,
                    useClass: GlobalErrorHandler
                }
            ],
            entryComponents: [AppComponent, MsalComponent]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map