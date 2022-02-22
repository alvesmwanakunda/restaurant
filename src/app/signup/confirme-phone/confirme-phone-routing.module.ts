import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmePhoneComponent } from './confirme-phone.component';

const routes: Routes = [{
  path:"",
  component:ConfirmePhoneComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmePhoneRoutingModule { }
