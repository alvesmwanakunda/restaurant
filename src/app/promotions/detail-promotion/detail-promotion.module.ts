import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPromotionComponent } from './detail-promotion.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [DetailPromotionComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[DetailPromotionComponent]
})
export class DetailPromotionModule { }
