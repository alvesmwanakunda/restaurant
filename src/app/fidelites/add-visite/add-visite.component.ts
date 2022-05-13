import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { VisiteService } from 'src/app/shared/services/visite.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { FidelitesComponent } from '../fidelites.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';

@Component({
  selector: 'app-add-visite',
  templateUrl: './add-visite.component.html',
  styleUrls: ['./add-visite.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-add-visite'}
})
export class AddVisiteComponent implements OnInit {

  entreprise:any;
  visite:any;
  visiteForm: FormGroup;
  visiteFormErrors: any;
  types:any;
  onLoadForm: boolean = false;
  visites="Visites";

  constructor(
    private typePointService:TypePointService,
    private visiteService:VisiteService,
    private entrepriseService:EntrepriseService,
    public dialogRef: MatDialogRef<FidelitesComponent>,
  ) { 
    this.visiteFormErrors = {
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
    for (const field in this.visiteFormErrors){
      if(!this.visiteFormErrors.hasOwnProperty(field)){
        continue;
      }
      this.visiteFormErrors[field]={};
      const control = this.visiteForm.get(field);
      if(control && control.dirty && !control.valid){
        this.visiteForm[field] = control.errors;
      }
    }
  }

  ngOnInit(): void {

    this.getEntreprise();

    this.visiteForm = new FormGroup({
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
             //console.log("types", res);
             this.types = res.message.filter((item)=> item.nom!="Achats");
             console.log("types", this.types);
      } catch (error) {
         console.log("Erreur", error)
      }
    })
  }

  addVisite():void{
    this.onLoadForm = true;
    this.visite = {};
    if(!this.visiteForm.invalid){

      this.visiteForm.value.typesPoint =  this.types[0]._id;

      Object.assign(this.visite, this.visiteForm.value);
      this.visiteService.addVisite(this.visite, this.entreprise._id).subscribe((res:any)=>{
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
