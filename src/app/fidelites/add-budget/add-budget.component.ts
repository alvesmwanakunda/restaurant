import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { FidelitesComponent } from '../fidelites.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BudgetService } from 'src/app/shared/services/budget.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-add-budget'}
})
export class AddBudgetComponent implements OnInit {

  entreprise:any;
  budget:any;
  budgetForm: FormGroup;
  budgetFormErrors: any;
  types:any;
  onLoadForm: boolean = false;

  constructor(
    private budgetService:BudgetService,
    private entrepriseService:EntrepriseService,
    public dialogRef: MatDialogRef<FidelitesComponent>,
  ) { 
    this.budgetFormErrors = {
      point: {},
      achat:{}
    };
  }

  account_validation_messages={
    point:[
      {
        type: "required",
        message: "Ce champ est requis",
      }
    ],

    achat:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],
    
  };

  onFormValuesChanged(){
    for (const field in this.budgetFormErrors){
      if(!this.budgetFormErrors.hasOwnProperty(field)){
        continue;
      }
      this.budgetFormErrors[field]={};
      const control = this.budgetForm.get(field);
      if(control && control.dirty && !control.valid){
        this.budgetForm[field] = control.errors;
      }
    }
  }

  ngOnInit(): void {

    this.getEntreprise();

    this.budgetForm = new FormGroup({
      point:new FormControl("",[Validators.required]),
      achat:new FormControl("",[Validators.required]),
    });
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

  addBudget():void{
    this.onLoadForm = true;
    this.budget = {};
    if(!this.budgetForm.invalid){

      Object.assign(this.budget, this.budgetForm.value);
      this.budgetService.addBudget(this.budget, this.entreprise._id).subscribe((res:any)=>{
          try {
            console.log("Response produit", res);
            this.onLoadForm = false;
            this.dialogRef.close(res.message);
          } catch (error) {
            console.log("Erreur ", error);
            this.onLoadForm=false;
          }
      })
    }
  }

 

}
