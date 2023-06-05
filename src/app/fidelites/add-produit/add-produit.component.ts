import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';
 import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import { FidelitesComponent } from '../fidelites.component';


@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit {

  entreprise:any;
  produitForm: FormGroup;
  produitFormErrors: any;
  produit:any;
  fileName:any;
  file:File;
  onLoadForm: boolean = false;
  isMax:boolean = false;
  message:any;

  constructor(
    private produitService:ProduitService,
    private entrepriseService:EntrepriseService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<FidelitesComponent>,
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

  ngOnInit(): void {

    this.getEntreprise();

    this.produitForm = new FormGroup({
      nom:new FormControl("",[Validators.required]),
      quantite:new FormControl(1,[Validators.required]),
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
    var maxSize = 650000;

    if(this.file.size > maxSize){
      //console.log("Erreur taille");
      this.isMax = true;
      this.message = `${this.fileName}: Taille de fichier non valide, la taille maximale de téléchargement est de 250 KB.`;
    }else{
      this.message = `Nouvelle image: ${this.fileName}`;
    }
  }

  addProduit():void{
    this.onLoadForm = true;
    this.produit = {};
    const formData: FormData = new FormData();
    Object.assign(this.produit, this.produitForm.value);
    formData.append("uploadfile",this.file);
    formData.append("nom",this.produit.nom);
    formData.append("quantite",this.produit.quantite);
    formData.append("description",this.produit.description);

    if(!this.produitForm.invalid){
     
      this.produitService.addProduit(formData, this.entreprise._id).subscribe((res:any)=>{
          try {
            console.log("Response produit", res);
            this.dialogRef.close(res.message);
            this.onLoadForm = false;
          } catch (error) {
            console.log("Erreur ", error);
            this.onLoadForm = false;
          }
      })
    }
  }

}
