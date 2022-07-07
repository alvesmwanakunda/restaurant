import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteManyClientComponent } from './delete-many-client.component';
import { ClientService } from 'src/app/shared/services/client.service';



@NgModule({
  declarations: [DeleteManyClientComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[DeleteManyClientComponent],
  providers:[ClientService]
})
export class DeleteManyClientModule { }
