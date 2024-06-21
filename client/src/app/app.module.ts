import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationRef, DoBootstrap, ErrorHandler, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ServerErrorInterceptor, SenecaAngularServerErrorInterceptorModule } from '../../dist/seneca-angular-server-error-interceptor';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SenecaAngularErrorHandlerModule, SenecaAngularErrorHandlerService } from '../../dist/seneca-angular-error-handler';
import { FullMaterialModule } from './iap/shared/material/full-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatGridListModule, MatIconModule, MatMenuModule, MatButtonModule, MatTreeModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule(
{
  declarations: [
    AppComponent, 
    PageNotFoundComponent,
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,   
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    LoggerModule.forRoot({level: !environment.production ? NgxLoggerLevel.LOG : NgxLoggerLevel.OFF,serverLogLevel: NgxLoggerLevel.OFF})
  ],
  providers: 
  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: SenecaAngularErrorHandlerService
    }
  ],
  entryComponents: [AppComponent]
})

export class AppModule implements DoBootstrap 
{
  constructor() { }

  ngDoBootstrap(ref: ApplicationRef) 
  {
    if (window !== window.parent && !window.opener) 
    {
    } 
    else 
    {
      ref.bootstrap(AppComponent);
    }
  }
}
