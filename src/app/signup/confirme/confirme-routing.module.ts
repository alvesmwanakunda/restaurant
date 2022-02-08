import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmeComponent } from './confirme.component';

const routes: Routes = [{
  path:"",
  component:ConfirmeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmeRoutingModule { }
