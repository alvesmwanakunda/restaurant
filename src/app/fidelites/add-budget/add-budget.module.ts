import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddBudgetComponent } from './add-budget.component';
import { BudgetService } from 'src/app/shared/services/budget.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';




@NgModule({
  declarations: [AddBudgetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[AddBudgetComponent],
  providers:[BudgetService, EntrepriseService]
})
export class AddBudgetModule { }
