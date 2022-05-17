import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametresComponent } from './parametres.component';
import { ParametresRoutingModule } from './parametres-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavBarModule } from '../menus/nav-bar/nav-bar.module';
import { AddPersonnelModule } from './add-personnel/add-personnel.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { PasswordModule } from './password/password.module';
import { HoraireModule } from './horaire/horaire.module';
import { AuthService } from '../shared/services/auth.service';
import { EntrepriseService } from '../shared/services/entreprise.service';
import { DeleteUserModule } from './delete-user/delete-user.module';
import { AvoirService } from '../shared/services/avoir.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatePersonnelModule } from './update-personnel/update-personnel.module';




@NgModule({
  declarations: [ParametresComponent],
  imports: [
    CommonModule,
    ParametresRoutingModule,
    SharedModule,
    NavBarModule,
    AddPersonnelModule,
    EntrepriseModule,
    PasswordModule,
    HoraireModule,
    DeleteUserModule,
    FormsModule,
    ReactiveFormsModule,
    UpdatePersonnelModule
  ],
  providers:[AuthService, EntrepriseService, AvoirService]
})
export class ParametresModule { }
