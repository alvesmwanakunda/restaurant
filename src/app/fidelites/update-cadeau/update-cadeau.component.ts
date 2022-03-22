import { Component, OnInit,ViewEncapsulation,Inject } from '@angular/core';
import { CadeauService } from 'src/app/shared/services/cadeau.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { CadeauInterface } from 'src/app/shared/interfaces/cadeau.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';
 import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
 import { FidelitesComponent } from '../fidelites.component';


@Component({
  selector: 'app-update-cadeau',
  templateUrl: './update-cadeau.component.html',
  styleUrls: ['./update-cadeau.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-update-cadeau'}
})
export class UpdateCadeauComponent implements OnInit {

  cadeau:CadeauInterface;
  onLoadForm: boolean = false;
  cadeauForm: FormGroup;
  types:any;
  produits:any;
  entreprise:any;
  idCadeau:any;
  datedebut:any;
  datefin:any;

  constructor(
    private cadeauService: CadeauService, 
    private entrepriseService:EntrepriseService,
    private produitService:ProduitService,
    private typePointService:TypePointService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FidelitesComponent>,
    ) { }

  ngOnInit(): void {
    this.getEntreprise();
    this.getCadeau(this.data.id);
  }

  getCadeau(idCadeau){
    
     this.cadeauService.getCadeau(idCadeau).subscribe((res:any)=>{

        try {

            this.cadeau = res.message;

            if(this.cadeau.dateDebut){
               this.datedebut = new Date(this.cadeau.dateDebut).toISOString().split('T')[0];
            }
            if(this.cadeau.dateFin){
              this.datefin = new Date(this.cadeau.dateFin).toISOString().split('T')[0];
            }
            if(this.cadeau){
              this.cadeauForm = new FormGroup({
                point: new FormControl(this.cadeau.point,[Validators.required]),
                produit:new FormControl(this.cadeau.produit,[Validators.required]),
                typesPoint:new FormControl(this.cadeau.typesPoint,[Validators.required]),
                dateDebut:new FormControl(this.cadeau.dateDebut,null),
                dateFin: new FormControl(this.cadeau.dateFin,null)
              })
            }
          
        } catch (error) {
          console.log("Error", error);
        }
     })
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

  updateCadeau(cadeau:CadeauInterface){

    this.onLoadForm = true;
    this.cadeauService.updateCadeau(cadeau, this.data.id).subscribe((res:any)=>{
      try {
           this.cadeau = cadeau;
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
