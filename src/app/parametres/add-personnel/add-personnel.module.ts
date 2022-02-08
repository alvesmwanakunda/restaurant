import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPersonnelComponent } from './add-personnel.component';
//import { AddPersonnelRoutingModule } from './add-personnel-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarModule } from 'src/app/menus/nav-bar/nav-bar.module';

@NgModule({
  declarations: [AddPersonnelComponent],
  imports: [
    CommonModule,
    //AddPersonnelRoutingModule,
    SharedModule,
    NavBarModule
  ],
  exports:[AddPersonnelComponent]
})
export class AddPersonnelModule { }
