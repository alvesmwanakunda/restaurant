import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkEntrepriseComponent } from './link-entreprise.component';

const routes: Routes = [{
  path:'',
  component:LinkEntrepriseComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkEntrepriseRoutingModule { }
