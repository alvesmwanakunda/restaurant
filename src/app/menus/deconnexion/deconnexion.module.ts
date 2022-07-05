import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeconnexionComponent } from './deconnexion.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/shared/services/auth.service';



@NgModule({
  declarations: [DeconnexionComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[DeconnexionComponent],
  providers:[AuthService]
})
export class DeconnexionModule { }
