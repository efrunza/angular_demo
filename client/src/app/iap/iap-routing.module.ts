import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IAPFirstComponent } from './components/iap-first-component/iap-first.component';
import { PersonalinfoComponent2 } from './components/personalinfo/personalinfo.component';

const routes: Routes = [
  {
    path: '',
    component: IAPFirstComponent
  },
  {
    path: 'personal-info',
    component: PersonalinfoComponent2
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IAPRoutingModule {}
