import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPromotionComponent } from './add-promotion.component';
import { AddPromotionRoutingModule } from './add-promotion-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarModule } from 'src/app/menus/nav-bar/nav-bar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromotionsService } from 'src/app/shared/services/promotions.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { Types } from 'src/app/shared/class/types';
import { Regions } from 'src/app/shared/class/regions';
import { Zone } from 'src/app/shared/class/zone';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AddPromotionComponent],
  imports: [
    CommonModule,
    AddPromotionRoutingModule,
    NavBarModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers:[PromotionsService, EntrepriseService, Types, Regions, Zone]
})
export class AddPromotionModule { }
