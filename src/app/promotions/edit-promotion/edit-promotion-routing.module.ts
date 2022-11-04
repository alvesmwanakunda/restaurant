import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPromotionComponent } from './edit-promotion.component';

const routes: Routes = [{
  path:"",
  component:EditPromotionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPromotionRoutingModule { }
