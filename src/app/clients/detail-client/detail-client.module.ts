import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailClientComponent } from './detail-client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientService } from 'src/app/shared/services/client.service';



@NgModule({
  declarations: [DetailClientComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[DetailClientComponent],
  providers:[ClientService]
})
export class DetailClientModule { }
