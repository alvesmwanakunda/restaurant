import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPromotionComponent } from './add-promotion.component';
import { AddPromotionRoutingModule } from './add-promotion-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarModule } from 'src/app/menus/nav-bar/nav-bar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddPromotionComponent],
  imports: [
    CommonModule,
    AddPromotionRoutingModule,
    NavBarModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddPromotionModule { }
