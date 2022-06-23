import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnniversaireMessageComponent } from './anniversaire-message.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'src/app/shared/services/message.service';
import { EntrepriseModule } from 'src/app/parametres/entreprise/entreprise.module';
import { Types } from 'src/app/shared/class/types';



@NgModule({
  declarations: [AnniversaireMessageComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[AnniversaireMessageComponent],
  providers:[MessageService,EntrepriseModule,Types]

})
export class AnniversaireMessageModule { }
