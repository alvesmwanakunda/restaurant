import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { AddCadeauComponent } from '../add-cadeau/add-cadeau.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-produit'}
})
export class ProduitComponent implements OnInit {

  entreprise:any;
  produitForm: FormGroup;
  produitFormErrors: any;
  produits:any;
  produit:any;
  fileName:any;
  file:File;
  
  constructor(
    private produitService:ProduitService,
    private entrepriseService:EntrepriseService,
    public fb: FormBuilder,
    private addCadeauComponent: AddCadeauComponent
    ) {
      this.produitFormErrors = {
        nom: {},
        quantite:{}
      };
     }

    account_validation_messages={
      nom:[
        {
          type: "required",
          message: "Ce champ est requis",
        }
      ],
  
      quantite:[
        {
          type:"required",
          message:"Ce champ est requis"
        }
      ],
      
    };

    onFormValuesChanged(){
      for (const field in this.produitFormErrors){
        if(!this.produitFormErrors.hasOwnProperty(field)){
          continue;
        }
        this.produitFormErrors[field]={};
        const control = this.produitForm.get(field);
        if(control && control.dirty && !control.valid){
          this.produitForm[field] = control.errors;
        }
      }
    }
  //uploadfile
  ngOnInit(): void {
     this.getEntreprise();

     this.produitForm = new FormGroup({
      nom:new FormControl("",[Validators.required]),
      quantite:new FormControl("",[Validators.required]),
      description:new FormControl("",null),
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

  onFileSelected(event){

    
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    
  }

  addProduit():void{
   
    this.produit = {};
    const formData: FormData = new FormData();
    Object.assign(this.produit, this.produitForm.value);
    formData.append("uploadfile",this.file);
    formData.append("nom",this.produit.nom);
    formData.append("quantite",this.produit.quantite);
    formData.append("description",this.produit.description);

    //console.log("Produit", this.produit);

    if(!this.produitForm.invalid){
     
      this.produitService.addProduit(formData, this.entreprise._id).subscribe((res:any)=>{
          try {
            console.log("Response produit", res);
            this.addCadeauComponent.viewProduit();
            this.addCadeauComponent.produitsList(this.entreprise._id);
            //this.fideliteComponent.

          } catch (error) {
            console.log("Erreur ", error);
          }
      })
    }
  }

}
