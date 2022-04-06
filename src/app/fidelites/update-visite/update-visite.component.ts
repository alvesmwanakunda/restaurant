import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { VisiteService } from 'src/app/shared/services/visite.service';
import { VisiteInterface } from 'src/app/shared/interfaces/visite.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';
 import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
 import { FidelitesComponent } from '../fidelites.component';

@Component({
  selector: 'app-update-visite',
  templateUrl: './update-visite.component.html',
  styleUrls: ['./update-visite.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-update-visite'}
})
export class UpdateVisiteComponent implements OnInit {

  visite:VisiteInterface;
  onLoadForm: boolean = false;
  visiteForm: FormGroup;
  types:any;
  entreprise:any;
  idVisite:any;

  constructor(
    private visiteService: VisiteService, 
    private entrepriseService:EntrepriseService,
    private typePointService:TypePointService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FidelitesComponent>
  ) { }

  ngOnInit(): void {
    this.getEntreprise();
    this.getVisite(this.data.id);
  }

  getVisite(idVisite){
    
    this.visiteService.getVisite(idVisite).subscribe((res:any)=>{

       try {

           this.visite = res.message;
           if(this.visite){
             this.visiteForm = new FormGroup({
               point: new FormControl(this.visite.point,[Validators.required]),
               typesPoint:new FormControl(this.visite.typesPoint,[Validators.required])
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
             //this.types = res.message;
             this.types = res.message.filter((item)=> item.nom!="Achats");
      } catch (error) {
         console.log("Erreur", error)
      }
    })
  }

  updateVisite(visite:VisiteInterface){

    this.onLoadForm = true;
    this.visiteService.updateVisite(this.visite, this.data.id).subscribe((res:any)=>{
      try {
           this.visite = visite;
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
