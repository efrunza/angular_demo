import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { routeList } from './iaw/models';

const routes: Routes = [
  { path: '',redirectTo: 'iap',pathMatch: 'full' },
  { path: `${routeList.application.path}`, loadChildren: './iaw/application.module#ApplicationModule' },
  { path: 'iap',loadChildren: './iap/iap.module#IAPModule' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
