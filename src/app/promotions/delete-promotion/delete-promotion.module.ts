import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeletePromotionComponent } from './delete-promotion.component';
import { PromotionsService } from 'src/app/shared/services/promotions.service';



@NgModule({
  declarations: [DeletePromotionComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers:[PromotionsService]
})
export class DeletePromotionModule { }
