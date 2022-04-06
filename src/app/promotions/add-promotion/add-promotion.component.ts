import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { PromotionsService } from 'src/app/shared/services/promotions.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Types } from 'src/app/shared/class/types';
import { Regions } from 'src/app/shared/class/regions';
import { Zone } from 'src/app/shared/class/zone';


@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.scss']
})
export class AddPromotionComponent implements OnInit {

  isLinear = true;
  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  threeFormGroup:FormGroup;
  entreprise:any;
  promotionForm: FormGroup;
  promotionFormErrors: any;
  promotion:any;
  promotion1:any;
  promotion3:any;
  fileName:any;
  file:File;
  onLoadForm:boolean=false;
  message:any;
  listType:any=[];
  listRegion:any=[];
  listZone:any=[];
  isProgrammer:boolean=false;
  isInterval:boolean=false;
  isNombre:boolean=false;
  isValid:boolean=false;
  isSms:boolean=false;
  isWefid:boolean=false;

  constructor(
    private _formBuilder:FormBuilder,
    private promotionService: PromotionsService,
    private entrepriseService: EntrepriseService,
    private _snackBar: MatSnackBar,
    public types: Types,
    public regions: Regions,
    public zones:Zone,
    ) {
      this.promotionFormErrors = {
        nom: {},
        types:{},
        cible:{},
        critere:{},
        condition:{}
      };
  }

  account_validation_messages={
    nom:[
      {
        type: "required",
        message: "Ce champ est requis",
      }
    ],

    types:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],

    cible:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],

    critere:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],

    condition:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],
    
  };

  ngOnInit(): void {

    this.getEntreprise();
    this.listType = this.types.listTypes;
    this.listRegion = this.regions.listRegions;
    this.listZone = this.zones.listZone;

    this.firstFormGroup = this._formBuilder.group({
      nom:['', Validators.required],
      types:["",null],
      sms:["",null],
      email:["",null],
    });
    this.secondFormGroup = this._formBuilder.group({
      cible:['',Validators.required],
      critere:["",Validators.required],
      jours:["",null],
      heure:["",null],
    });
    this.threeFormGroup = this._formBuilder.group({
      condition:['',Validators.required],
      interval1:["",null],
      interval2:["",null],
      age1:["",null],
      age2:["",null],
      sexe:["",null],
      region:["",null],
      zone:["",null],
      nombre:["",null],
    })
  }

  getEntreprise(){

    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
           this.entreprise = res.body;
           console.log("Entreprise", this.entreprise);
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  onFileSelected(event){
    this.file = event.target.files[0];
    this.fileName = this.file.name;
  }

  addProduit(etat:string):void{
   
    this.promotion = {};
    this.promotion1 = {};
    this.promotion3 = {};
    this.onLoadForm=true;
    const formData: FormData = new FormData();
    Object.assign(this.promotion, this.firstFormGroup.value);
    Object.assign(this.promotion1, this.secondFormGroup.value);
    Object.assign(this.promotion3, this.threeFormGroup.value);

    formData.append("uploadfile",this.file);
    formData.append("nom",this.promotion.nom);
    formData.append("types",this.promotion.types);
    formData.append("sms",this.promotion.sms);
    formData.append("email",this.promotion.email);
    formData.append("cible",this.promotion1.cible);
    formData.append("critere",this.promotion1.critere);
    formData.append("jours",this.promotion1.jours);
    formData.append("heure",this.promotion1.heure);
    formData.append("condition",this.promotion3.condition);
    formData.append("interval1",this.promotion3.interval1);
    formData.append("interval2",this.promotion3.interval2);
    formData.append("age1",this.promotion3.age1);
    formData.append("age2",this.promotion3.age2);
    formData.append("sexe",this.promotion3.sexe);
    formData.append("region",this.promotion3.region);
    formData.append("zone",this.promotion3.zone);
    formData.append("nombre",this.promotion3.nombre);
    formData.append("etat",etat);

    //console.log("Produit", this.produit);

      this.promotionService.addPromotion(formData, this.entreprise._id).subscribe((res:any)=>{
          try {
            console.log("Response produit", res);
            this.onLoadForm = false;
            this.message=`Votre promotion a été ${etat} avec succès.`;
            this.openSnackBar(this.message);

          } catch (error) {
            this.onLoadForm = false;
            this.message="Une erreur s'est produite veuillez réessayer.";
            this.openSnackBar(this.message);
            console.log("Erreur ", error);
          }
      })
    
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }

  Pprogrammer(){
    this.isProgrammer =true;
  }
  isInstan(){
    this.isProgrammer = false;
  }
  interval(){
    this.isInterval = true;
    this.isNombre=false;
    this.isValid=true;
  }
  atteintNombre(){
    this.isInterval = false;
    this.isNombre=true;
    this.isValid=true
  }

  selectSms(event){
    console.log("Event", event);
    if(event=="Sms"){
      this.isSms=false
    }else{
      this.isSms=true
    }
  }

  selectWefid(){
    if(this.isWefid){
      this.isWefid = false;
    }else{
      this.isWefid = true;
    }
  }

  selectClient(){
    this.isWefid = false;
  }
}
