import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { FidelitesComponent } from '../fidelites.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LivraisonService } from 'src/app/shared/services/livraison.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';

@Component({
  selector: 'app-add-livraison',
  templateUrl: './add-livraison.component.html',
  styleUrls: ['./add-livraison.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-add-livraison'}
})
export class AddLivraisonComponent implements OnInit {

  entreprise:any;
  livraison:any;
  livraisonForm: FormGroup;
  livraisonFormErrors: any;
  types:any;
  onLoadForm: boolean = false;

  constructor(
    private typePointService:TypePointService,
    private livraisonService:LivraisonService,
    private entrepriseService:EntrepriseService,
    public dialogRef: MatDialogRef<FidelitesComponent>,
  ) {
    this.livraisonFormErrors = {
      point: {},
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

    typesPoint:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],
    
  };

  onFormValuesChanged(){
    for (const field in this.livraisonFormErrors){
      if(!this.livraisonFormErrors.hasOwnProperty(field)){
        continue;
      }
      this.livraisonFormErrors[field]={};
      const control = this.livraisonForm.get(field);
      if(control && control.dirty && !control.valid){
        this.livraisonForm[field] = control.errors;
      }
    }
  }

  ngOnInit(): void {

    this.getEntreprise();

    this.livraisonForm = new FormGroup({
      point:new FormControl("",[Validators.required]),
      typesPoint:new FormControl("",[Validators.required]),
    });
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
           this.entreprise = res.body;
           this.typePointList(this.entreprise._id);
      } catch (error) {
        console.log("Erreur ", error);
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

  addLivraison():void{
    this.onLoadForm = true;
    this.livraison = {};
    if(!this.livraisonForm.invalid){

      Object.assign(this.livraison, this.livraisonForm.value);
      this.livraisonService.addLivraison(this.livraison, this.entreprise._id).subscribe((res:any)=>{
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
