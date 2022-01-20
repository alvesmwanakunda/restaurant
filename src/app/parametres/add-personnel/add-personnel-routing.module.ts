import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonnelComponent } from './add-personnel.component';

const routes: Routes = [{
  path:'',
  component:AddPersonnelComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPersonnelRoutingModule { }
