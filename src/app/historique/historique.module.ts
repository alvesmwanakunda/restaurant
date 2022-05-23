import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriqueComponent } from './historique.component';
import { HistoriqueRoutingModule } from './historique-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavBarModule } from '../menus/nav-bar/nav-bar.module';
import { AvoirService } from '../shared/services/avoir.service';
import { EntrepriseService } from '../shared/services/entreprise.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HistoriqueComponent],
  imports: [
    CommonModule,
    HistoriqueRoutingModule,
    NavBarModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[AvoirService,EntrepriseService]
})
export class HistoriqueModule { }
