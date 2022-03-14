import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FidelitesComponent } from '../fidelites.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BudgetService } from 'src/app/shared/services/budget.service';
import { BudgetInterface } from 'src/app/shared/interfaces/budget.interface';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';

@Component({
  selector: 'app-update-budget',
  templateUrl: './update-budget.component.html',
  styleUrls: ['./update-budget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-update-budget'}
})
export class UpdateBudgetComponent implements OnInit {

  budget:BudgetInterface;
  onLoadForm: boolean = false;
  budgetForm: FormGroup;
  idBudget:any;
  entreprise:any;

  constructor(
    private budgetService:BudgetService,
    private entrepriseService:EntrepriseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FidelitesComponent>,
  ) { }

  ngOnInit(): void {
    this.getEntreprise();
    this.getBudget(this.data.id);
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
           this.entreprise = res.body;
      } catch (error) {
        console.log("Erreur ", error);
      }
    })
  }

 getBudget(idBudget){
    
    this.budgetService.getBudget(idBudget).subscribe((res:any)=>{

       try {

           this.budget = res.message;
           if(this.budget){
             this.budgetForm = new FormGroup({
               point: new FormControl(this.budget.point,[Validators.required]),
               achat:new FormControl(this.budget.achat,[Validators.required])
             })
           }
         
       } catch (error) {
         console.log("Error", error);
       }
    })
 }

 updateBudget(budget:BudgetInterface){

  this.onLoadForm = true;
  this.budgetService.updateBudget(this.budget, this.data.id).subscribe((res:any)=>{
    try {
         this.budget = budget;
         //console.log("cadeau", res);
         this.onLoadForm=false;
         this.dialogRef.close(res.message);

    } catch (error) {
      this.onLoadForm=false;
      console.log("Error",error);
    }
  })
}

}
