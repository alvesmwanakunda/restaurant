import { Component, OnInit,ViewEncapsulation,Inject } from '@angular/core';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { LivraisonService } from 'src/app/shared/services/livraison.service';
import { LivraisonInterface } from 'src/app/shared/interfaces/livraison.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';
 import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
 import { FidelitesComponent } from '../fidelites.component';

@Component({
  selector: 'app-update-livraison',
  templateUrl: './update-livraison.component.html',
  styleUrls: ['./update-livraison.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-update-livraison'}
})
export class UpdateLivraisonComponent implements OnInit {

  livraison:LivraisonInterface;
  onLoadForm: boolean = false;
  livraisonForm: FormGroup;
  types:any;
  entreprise:any;
  idLivraison:any;

  constructor(
    private livraisonService: LivraisonService, 
    private entrepriseService:EntrepriseService,
    private typePointService:TypePointService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FidelitesComponent>
  ) { }

  ngOnInit(): void {
    this.getEntreprise();
    this.getLvraison(this.data.id);
  }

  getLvraison(idLivraison){
    
    this.livraisonService.getLivraison(idLivraison).subscribe((res:any)=>{

       try {

           this.livraison = res.message;
           if(this.livraison){
             this.livraisonForm = new FormGroup({
               point: new FormControl(this.livraison.point,[Validators.required]),
               typesPoint:new FormControl(this.livraison.typesPoint,[Validators.required]),
               nombreLivraison:new FormControl(this.livraison.nombreLivraison,[Validators.required]),
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

updateLivraison(livraison:LivraisonInterface){

  this.onLoadForm = true;
  this.livraisonService.updateLivraison(this.livraison, this.data.id).subscribe((res:any)=>{
    try {
         this.livraison = livraison;
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
