import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FidelitesComponent } from './fidelites.component';

const routes: Routes = [{
  path:"",
  component:FidelitesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FidelitesRoutingModule { }
