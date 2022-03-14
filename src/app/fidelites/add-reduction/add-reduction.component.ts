import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { ReductionService } from 'src/app/shared/services/reduction.service';
import { FidelitesComponent } from '../fidelites.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';

@Component({
  selector: 'app-add-reduction',
  templateUrl: './add-reduction.component.html',
  styleUrls: ['./add-reduction.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-add-reduction'}
})
export class AddReductionComponent implements OnInit {

  entreprise:any;
  reduction:any;
  reductionForm: FormGroup;
  reductionFormErrors: any;
  produits:any;
  types:any;
  onLoadForm: boolean = false;

  constructor(
    private entrepriseService:EntrepriseService,
    private produitService:ProduitService,
    private typePointService:TypePointService,
    private reductionService:ReductionService,
    public dialogRef: MatDialogRef<FidelitesComponent>,
  ) { 
    this.reductionFormErrors = {
      point: {},
      produit:{},
      typesPoint:{},
      montant:{}
    };
  }

  account_validation_messages={
    point:[
      {
        type: "required",
        message: "Ce champ est requis",
      }
    ],

    produit:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],

    typesPoint:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],

    montant:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],
    
  };

  onFormValuesChanged(){
    for (const field in this.reductionFormErrors){
      if(!this.reductionFormErrors.hasOwnProperty(field)){
        continue;
      }
      this.reductionFormErrors[field]={};
      const control = this.reductionForm.get(field);
      if(control && control.dirty && !control.valid){
        this.reductionForm[field] = control.errors;
      }
    }
  }

  ngOnInit(): void {
    this.getEntreprise();

    this.reductionForm = new FormGroup({
      point:new FormControl("",[Validators.required]),
      produit:new FormControl("",[Validators.required]),
      typesPoint:new FormControl("",[Validators.required]),
      montant:new FormControl("",[Validators.required]),
    });
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
           this.entreprise = res.body;
           this.produitsList(this.entreprise._id);
           this.typePointList(this.entreprise._id);
      } catch (error) {
        console.log("Erreur ", error);
      }
    })
  }

  produitsList(idEntreprise){
    this.produitService.listProduit(idEntreprise).subscribe((res:any)=>{
      try {
            //console.log("res", res);
            this.produits = res.message;
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  typePointList(idEntreprise){
    this.typePointService.listPointEntreprise(idEntreprise).subscribe((res:any)=>{
      try {
             //console.log("types", res);
             this.types = res.message;
      } catch (error) {
         console.log("Erreur", error)
      }
    })
  }

  addReduction():void{
    this.onLoadForm = true;
    this.reduction = {};
    if(!this.reductionForm.invalid){

      Object.assign(this.reduction, this.reductionForm.value);
      this.reductionService.addReduction(this.reduction, this.entreprise._id).subscribe((res:any)=>{
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
