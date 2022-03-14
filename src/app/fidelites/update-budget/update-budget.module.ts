import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BudgetService } from 'src/app/shared/services/budget.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { UpdateBudgetComponent } from './update-budget.component';



@NgModule({
  declarations: [UpdateBudgetComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[UpdateBudgetComponent],
  providers:[BudgetService,EntrepriseService]
})
export class UpdateBudgetModule { }
