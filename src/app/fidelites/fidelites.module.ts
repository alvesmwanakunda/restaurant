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
import { CadeauService } from '../shared/services/cadeau.service';
import { EntrepriseService } from '../shared/services/entreprise.service';
import { UpdateCadeauModule } from './update-cadeau/update-cadeau.module';
import { ReductionService } from '../shared/services/reduction.service';
import { UpdateReductionModule } from './update-reduction/update-reduction.module';
import { LivraisonService } from '../shared/services/livraison.service';
import { UpdateLivraisonModule } from './update-livraison/update-livraison.module';
import { AddVisiteModule } from './add-visite/add-visite.module';
import { VisiteService } from '../shared/services/visite.service';
import { UpdateVisiteModule } from './update-visite/update-visite.module';
import { UpdateBudgetModule } from './update-budget/update-budget.module';
import { AddBudgetModule } from './add-budget/add-budget.module';
import { DeleteCadeauModule } from './delete-cadeau/delete-cadeau.module';
import { DeletePointModule } from './delete-point/delete-point.module';
import { ProduitService } from '../shared/services/produit.service';
import { AddProduitModule } from './add-produit/add-produit.module';
import { UpdateProduitModule } from './update-produit/update-produit.module';


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
    AddLivraisonModule,
    UpdateCadeauModule,
    UpdateReductionModule,
    UpdateLivraisonModule,
    AddVisiteModule,
    UpdateVisiteModule,
    UpdateBudgetModule,
    AddBudgetModule,
    DeleteCadeauModule,
    DeletePointModule,
    AddProduitModule,
    UpdateProduitModule
  ],
  providers:[CadeauService, EntrepriseService, ReductionService, LivraisonService, VisiteService, ProduitService]
})
export class FidelitesModule { }
