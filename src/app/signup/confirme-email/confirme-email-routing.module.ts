import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmeEmailComponent } from './confirme-email.component';

const routes: Routes = [{
  path:"",
  component:ConfirmeEmailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmeEmailRoutingModule { }
