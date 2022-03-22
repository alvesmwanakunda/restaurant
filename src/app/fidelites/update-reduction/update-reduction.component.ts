import { Component, OnInit,ViewEncapsulation,Inject } from '@angular/core';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { ReductionService } from 'src/app/shared/services/reduction.service';
import { ReductionInterface } from 'src/app/shared/interfaces/reduction.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';
 import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
 import { FidelitesComponent } from '../fidelites.component';

@Component({
  selector: 'app-update-reduction',
  templateUrl: './update-reduction.component.html',
  styleUrls: ['./update-reduction.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-update-reduction'}
})
export class UpdateReductionComponent implements OnInit {

  reduction:ReductionInterface;
  onLoadForm: boolean = false;
  reductionForm: FormGroup;
  types:any;
  produits:any;
  entreprise:any;
  idReduction:any;
  hProduit: boolean = false;

  constructor(
    private entrepriseService:EntrepriseService,
    private produitService:ProduitService,
    private typePointService:TypePointService,
    private reductionService: ReductionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FidelitesComponent>,
  ) { }

  ngOnInit(): void {
    this.getEntreprise();
    this.getReduction(this.data.id);

  }

  getReduction(idReduction){
    
    this.reductionService.getReduction(idReduction).subscribe((res:any)=>{

       try {

           this.reduction = res.message;
           if(this.reduction){
             this.reductionForm = new FormGroup({
               point: new FormControl(this.reduction.point,[Validators.required]),
               produit:new FormControl(this.reduction.produit,null),
               typesPoint:new FormControl(this.reduction.typesPoint,[Validators.required]),
               montant:new FormControl(this.reduction.montant,[Validators.required]),
               devise:new FormControl(this.reduction.devise,[Validators.required]),
               facture:new FormControl(this.reduction.facture,[Validators.required])
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

  updateReduction(reduction:ReductionInterface){

    this.onLoadForm = true;
    this.reductionService.updateReduction(reduction, this.data.id).subscribe((res:any)=>{
      try {
           this.reduction = reduction;
           //console.log("cadeau", res);
           this.onLoadForm=false;
           this.dialogRef.close(res.message);

      } catch (error) {
        this.onLoadForm=false;
        console.log("Error",error);
      }
    })
  }

  hideProduit(booster: boolean){
    if(!booster){
      this.hProduit = false
    }else{
      this.hProduit = true
      this.reduction.produit = null;
    }
  }

  hideFacture(){
    this.reduction.facture = false;
  }

}
