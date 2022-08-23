import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './header-bar.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeconnexionModule } from '../deconnexion/deconnexion.module';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';



@NgModule({
  declarations: [HeaderBarComponent],
  imports: [
    CommonModule,
    SharedModule,
    DeconnexionModule
  ],
  exports:[
    HeaderBarComponent
  ],
  providers:[AuthService,EntrepriseService]
})
export class HeaderBarModule { }
