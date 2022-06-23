import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavBarModule } from '../menus/nav-bar/nav-bar.module';
import { ClientService } from '../shared/services/client.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NavBarModule,
    SharedModule
  ],
  providers:[ClientService]
})
export class DashboardModule { }
