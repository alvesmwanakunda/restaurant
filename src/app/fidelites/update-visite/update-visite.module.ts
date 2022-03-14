import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { VisiteService } from 'src/app/shared/services/visite.service';
import { UpdateVisiteComponent } from './update-visite.component';



@NgModule({
  declarations: [UpdateVisiteComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[UpdateVisiteComponent],
  providers:[TypePointService, VisiteService]
})
export class UpdateVisiteModule { }
