import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavBarModule } from '../menus/nav-bar/nav-bar.module';
import { ClientService } from '../shared/services/client.service';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NavBarModule
  ],
  providers:[ClientService]
})
export class DashboardModule { }
