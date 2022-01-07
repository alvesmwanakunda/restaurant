import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriqueComponent } from './historique.component';
import { HistoriqueRoutingModule } from './historique-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavBarModule } from '../menus/nav-bar/nav-bar.module';


@NgModule({
  declarations: [HistoriqueComponent],
  imports: [
    CommonModule,
    HistoriqueRoutingModule,
    NavBarModule,
    SharedModule
  ]
})
export class HistoriqueModule { }
