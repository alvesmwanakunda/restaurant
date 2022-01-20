import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions.component';
import { PromotionsRoutingModule } from './promotions-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavBarModule } from '../menus/nav-bar/nav-bar.module';
import { DetailPromotionModule } from './detail-promotion/detail-promotion.module';


@NgModule({
  declarations: [PromotionsComponent],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    SharedModule,
    NavBarModule,
    DetailPromotionModule
  ]
})
export class PromotionsModule { }
