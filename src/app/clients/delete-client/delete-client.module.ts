import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteClientComponent } from './delete-client.component';
import { ClientService } from 'src/app/shared/services/client.service';


@NgModule({
  declarations: [DeleteClientComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[DeleteClientComponent],
  providers:[ClientService]
})
export class DeleteClientModule { }
