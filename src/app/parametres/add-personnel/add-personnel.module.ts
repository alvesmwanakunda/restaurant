import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPersonnelComponent } from './add-personnel.component';
//import { AddPersonnelRoutingModule } from './add-personnel-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarModule } from 'src/app/menus/nav-bar/nav-bar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';


@NgModule({
  declarations: [AddPersonnelComponent],
  imports: [
    CommonModule,
    //AddPersonnelRoutingModule,
    SharedModule,
    NavBarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[AddPersonnelComponent],
  providers:[AuthService, EntrepriseService]
})
export class AddPersonnelModule { }
