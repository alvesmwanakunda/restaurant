import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions.component';
import { PromotionsRoutingModule } from './promotions-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavBarModule } from '../menus/nav-bar/nav-bar.module';
import { DetailPromotionModule } from './detail-promotion/detail-promotion.module';
import { PromotionsService } from '../shared/services/promotions.service';
import { EntrepriseService } from '../shared/services/entreprise.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypesList } from '../shared/class/typesList';
import { Criteres } from '../shared/class/critere';


@NgModule({
  declarations: [PromotionsComponent],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    SharedModule,
    NavBarModule,
    DetailPromotionModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[PromotionsService, EntrepriseService, TypesList, Criteres]
})
export class PromotionsModule { }
