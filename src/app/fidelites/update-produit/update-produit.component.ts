import { Component, OnInit, Inject } from '@angular/core';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { ProduitInterface } from 'src/app/shared/interfaces/produit.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';
 import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import { FidelitesComponent } from '../fidelites.component';


@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.scss']
})
export class UpdateProduitComponent implements OnInit {

  produitForm: FormGroup;
  produitFormErrors: any;
  produit:ProduitInterface;
  objetProduit:any;
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
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

    this.getProduit(this.data.id);
  }

  getProduit(idProduit){

    this.produitService.getProduit(idProduit).subscribe((res:any)=>{
      try {
           this.produit = res.message;
           console.log("Produit", this.produit);
           this.produitForm = new FormGroup({
            nom:new FormControl(this.produit.nom,[Validators.required]),
            quantite:new FormControl(this.produit.quantite,[Validators.required]),
            description:new FormControl(this.produit.description,null),
          });
      } catch (error) {
        console.log("Erreur", error);
      }
    })

  }

  onFileSelected(event){
    this.file = event.target.files[0];
    this.fileName = this.file.name; 
    console.log("Size", this.file.size);
    var maxSize = 650000;

    if(this.file.size > maxSize){
      //console.log("Erreur taille");
      this.isMax = true;
      this.message = `${this.fileName}: Taille de fichier non valide, la taille maximale de téléchargement est de 250 kb.`;
    }else{
      this.message = `Nouvelle image: ${this.fileName}`;
    }
  }

  addProduit(produit:ProduitInterface):void{

    this.onLoadForm = true;
    this.objetProduit = {};
    const formData: FormData = new FormData();
    //console.log("Value Form", this.produitForm.value);
    console.log("Value Produit", produit);
    Object.assign(this.objetProduit, produit);
    formData.append("uploadfile",this.file);
    formData.append("nom",this.objetProduit.nom);
    formData.append("quantite",this.objetProduit.quantite);
    formData.append("description",this.objetProduit.description);

    if(!this.produitForm.invalid){
     
      this.produitService.updateProduit(formData, this.data.id).subscribe((res:any)=>{
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
