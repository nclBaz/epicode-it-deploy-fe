import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnersRoutingModule } from './owners-routing.module';
import { OwnersComponent } from './owners.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    OwnersComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    OwnersRoutingModule,
    FormsModule
  ]
})
export class OwnersModule { }
