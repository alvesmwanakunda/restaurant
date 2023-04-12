import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuComponent } from './cu.component';

const routes: Routes = [{
  path:'',
  component:CuComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuRoutingModule { }
