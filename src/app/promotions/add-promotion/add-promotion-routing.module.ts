import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPromotionComponent } from './add-promotion.component';

const routes: Routes = [{
  path:"",
  component:AddPromotionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPromotionRoutingModule { }
