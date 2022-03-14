import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddVisiteComponent } from './add-visite.component';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { VisiteService } from 'src/app/shared/services/visite.service';




@NgModule({
  declarations: [AddVisiteComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[AddVisiteComponent],
  providers:[TypePointService,VisiteService]
})
export class AddVisiteModule { }
