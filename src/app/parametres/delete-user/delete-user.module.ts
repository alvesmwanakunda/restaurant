import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteUserComponent } from './delete-user.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';



@NgModule({
  declarations: [DeleteUserComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[DeleteUserComponent],
  providers:[AuthService,EntrepriseService]

})
export class DeleteUserModule { }
