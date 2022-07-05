import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteMessageComponent } from './delete-message.component';
import { MessageService } from 'src/app/shared/services/message.service';



@NgModule({
  declarations: [DeleteMessageComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[DeleteMessageComponent],
  providers:[MessageService]
})
export class DeleteMessageModule { }
