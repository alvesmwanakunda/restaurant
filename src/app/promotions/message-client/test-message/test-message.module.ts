import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestMessageComponent } from './test-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { MessageService } from 'src/app/shared/services/message.service';



@NgModule({
  declarations: [TestMessageComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[TestMessageComponent],
  providers:[EntrepriseService,MessageService]
})
export class TestMessageModule { }
