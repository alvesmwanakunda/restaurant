import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HoraireService } from 'src/app/shared/services/horaire.service';
import { HoraireInterface } from 'src/app/shared/interfaces/horaire.interface';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-horaire'}
})
export class HoraireComponent implements OnInit {

  horaire:HoraireInterface;
  horaireForm: FormGroup;
  idEntreprise:any;
  onLoadForm: boolean = false;
  chargeHoraire:boolean = false;
  emptyHoraire:boolean = false;
  isUpdateH:boolean=false;


  constructor(
              private horaireService:HoraireService,
              private _snackBar: MatSnackBar, 
              private entrepriseService:EntrepriseService
  ) { }

  ngOnInit(): void {

      this.getEntreprise();

      this.horaireForm = new FormGroup({
        oLundi: new FormControl("",null),
        fLundi: new FormControl("",null),
        oMardi: new FormControl("",null),
        fMardi: new FormControl("",null),
        oMercredi: new FormControl("",null),
        fMercredi: new FormControl("",null),
        oJeudi: new FormControl("",null),
        fJeudi: new FormControl("",null),
        oVendredi: new FormControl("",null),
        fVendredi: new FormControl("",null),
        oSamedi: new FormControl("",null),
        fSamedi: new FormControl("",null),
        oDimanche: new FormControl("",null),
        fDimanche: new FormControl("",null),
      })
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
           this.idEntreprise = res.body._id;
           if(this.idEntreprise){
             this.getHoraire(this.idEntreprise);
           }
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  getHoraire(id){
    this.horaireService.getHoraire(id).subscribe((res:any)=>{
      try {
           this.horaire = res.message;
           if(res.message){
               this.chargeHoraire=true;
           }else{
              this.emptyHoraire=true; 
           }
      } catch (error) {
        console.log("Erreur", error)
      }
    })
  }

  createHoraire(horaire:HoraireInterface){
    console.log("Horaire", horaire.oLundi);
    this.onLoadForm = true;
    
      this.horaireService.addHoraire(horaire,this.idEntreprise).subscribe((res:any)=>{
        try {
              this.horaire = horaire;
              this.onLoadForm = false;
              this.chargeHoraire = false;
              this.emptyHoraire = false;
              this.isUpdateH = false;
              this.openSnackBar();
              console.log("reponse", res);
        } catch (error) {
          console.log("Error", error);
          this.onLoadForm = false;
        }
      })
    
  }

  createHoraireAdd(){
    this.onLoadForm = true;
    let horaire = {};

    Object.assign(horaire, this.horaireForm.value);
    
      this.horaireService.addHoraire(horaire,this.idEntreprise).subscribe((res:any)=>{
        try {
              this.horaire = res.message;
              this.onLoadForm = false;
              this.openSnackBarAdd();
              this.chargeHoraire = false;
              this.emptyHoraire = false;
              this.isUpdateH = false;
              console.log("reponse", res);
        } catch (error) {
          console.log("Error", error);
          this.onLoadForm = false;
        }
      })
    
  }

  openSnackBar() {
    this._snackBar.open('Horaire modifier avec succès', 'Fermer', {
      duration: 3000
    });
  }

  openSnackBarAdd() {
    this._snackBar.open('Horaires ajouter avec succès', 'Fermer', {
      duration: 3000
    });
  }

  openHoraire(){
    this.isUpdateH = true;
    this.getHoraire(this.idEntreprise);
  }

}
