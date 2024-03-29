import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CadeauService } from 'src/app/shared/services/cadeau.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { FidelitesComponent } from '../fidelites.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';



@Component({
  selector: 'app-add-cadeau',
  templateUrl: './add-cadeau.component.html',
  styleUrls: ['./add-cadeau.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-add-cadeau'}
})
export class AddCadeauComponent implements OnInit {

  entreprise:any;
  cadeau:any;
  cadeauForm: FormGroup;
  cadeauFormErrors: any;
  produits:any;
  types:any;
  isProduit:boolean=false;
  onLoadForm: boolean = false;
  isBooster:boolean = false;


  constructor(
    private cadeauService: CadeauService, 
    private entrepriseService:EntrepriseService,
    private produitService:ProduitService,
    private typePointService:TypePointService,
    public dialogRef: MatDialogRef<FidelitesComponent>,
    ) { 
    this.cadeauFormErrors = {
      point: {},
      produit:{},
      typesPoint:{}
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
    
  };

  onFormValuesChanged(){
    for (const field in this.cadeauFormErrors){
      if(!this.cadeauFormErrors.hasOwnProperty(field)){
        continue;
      }
      this.cadeauFormErrors[field]={};
      const control = this.cadeauForm.get(field);
      if(control && control.dirty && !control.valid){
        this.cadeauForm[field] = control.errors;
      }
    }
  }

  ngOnInit(): void {

    this.getEntreprise();

    this.cadeauForm = new FormGroup({
     point:new FormControl(1,[Validators.required]),
     produit:new FormControl("",[Validators.required]),
     typesPoint:new FormControl("",[Validators.required]),
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

  addCadeau():void{
    this.onLoadForm = true;
    this.cadeau = {};

    console.log("Cadeau", this.cadeauForm.value);


    if(!this.cadeauForm.invalid){

      Object.assign(this.cadeau, this.cadeauForm.value);
      this.cadeauService.addCadeau(this.cadeau, this.entreprise._id, "Cadeau").subscribe((res:any)=>{
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

  produitsList(idEntreprise){
    this.produitService.listProduit(idEntreprise).subscribe((res:any)=>{
      try {
            console.log("res", res);
            this.produits = res.message;
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  typePointList(idEntreprise){
    this.typePointService.listPointEntreprise(idEntreprise).subscribe((res:any)=>{
      try {
             console.log("types", res);
             this.types = res.message;
      } catch (error) {
         console.log("Erreur", error)
      }
    })
  }

  viewProduit(){
    if(!this.isProduit){
      this.isProduit = true
    }else{
      this.isProduit = false
    }
  }

  viewBooster(booster: boolean){

    console.log("Booster", booster);

    if(booster){
      this.isBooster=true;
      this.cadeauForm.addControl('dateDebut', new FormControl("", null));
      this.cadeauForm.addControl('dateFin', new FormControl("", null));
    }else{
      this.isBooster=false;
    }
  }
}
