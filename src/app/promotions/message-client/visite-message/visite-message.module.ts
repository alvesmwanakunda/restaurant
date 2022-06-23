import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisiteMessageComponent } from './visite-message.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'src/app/shared/services/message.service';
import { EntrepriseModule } from 'src/app/parametres/entreprise/entreprise.module';
import { Types } from 'src/app/shared/class/types';




@NgModule({
  declarations: [VisiteMessageComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[VisiteMessageComponent],
  providers:[MessageService,EntrepriseModule,Types]
})
export class VisiteMessageModule { }
