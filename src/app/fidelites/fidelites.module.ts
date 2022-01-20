import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FidelitesComponent } from './fidelites.component';
import { FidelitesRoutingModule } from './fidelites-routing.module';
import { NavBarModule } from '../menus/nav-bar/nav-bar.module';
import { SharedModule } from '../shared/shared.module';
import { CadeauModule } from './cadeau/cadeau.module';
import { ReductionModule } from './reduction/reduction.module';
import { LivraisonModule } from './livraison/livraison.module';
import { AddCadeauModule } from './add-cadeau/add-cadeau.module';
import { AddReductionModule } from './add-reduction/add-reduction.module';
import { AddLivraisonModule } from './add-livraison/add-livraison.module';


@NgModule({
  declarations: [FidelitesComponent],
  imports: [
    CommonModule,
    FidelitesRoutingModule,
    NavBarModule,
    SharedModule,
    CadeauModule,
    ReductionModule,
    LivraisonModule,
    AddCadeauModule,
    AddReductionModule,
    AddLivraisonModule
  ]
})
export class FidelitesModule { }
