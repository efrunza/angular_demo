import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAPRoutingModule } from './iap-routing.module';
import { IAPFirstComponent } from './components/iap-first-component/iap-first.component';
import { PersonalinfoComponent2 } from './components/personalinfo/personalinfo.component';
import {FullMaterialModule} from './shared/material/full-material.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTreeModule } from '@angular/material/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    FullMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule, 
    IAPRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTreeModule,],
  declarations: [IAPFirstComponent, PersonalinfoComponent2]
})
export class IAPModule {}
