import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPromotionComponent } from './detail-promotion.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PromotionsService } from 'src/app/shared/services/promotions.service';



@NgModule({
  declarations: [DetailPromotionComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[DetailPromotionComponent],
  providers:[PromotionsService]
})
export class DetailPromotionModule { }
