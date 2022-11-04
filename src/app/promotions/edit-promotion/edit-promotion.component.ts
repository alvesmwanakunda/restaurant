import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionsService } from 'src/app/shared/services/promotions.service';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Types } from 'src/app/shared/class/types';
import { Regions } from 'src/app/shared/class/regions';
import { Zone } from 'src/app/shared/class/zone';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.scss']
})
export class EditPromotionComponent implements OnInit {

  idPromotion:any;
  promotion:any;
  isLinear = true;
  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  threeFormGroup:FormGroup;
  listType:any=[];
  listRegion:any=[];
  listZone:any=[];
  promotionFormErrors: any;
  isSms:boolean=false;
  fileName:any;
  file:File;
  image:any;
  isProgrammer:boolean=false;
  jours:any;
  onLoadForm:boolean=false;
  message:any;


  constructor(
    private routes: ActivatedRoute,
    private promotionService: PromotionsService,
    private _snackBar: MatSnackBar,
    public types: Types,
    public regions: Regions,
    public zones:Zone,
    private _formBuilder:FormBuilder,
    private sanitizer: DomSanitizer,
  ) { 
    this.routes.params.subscribe((data:any)=>{
      this.idPromotion = data.id;
      console.log("Data", data);
    });
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
    this.getPromotion();
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
      etat:["",null],
    })
  }

  getPromotion(){
    this.promotionService.getPromotion(this.idPromotion).subscribe((res:any)=>{
      try {
           console.log("promotion", res.message);
           this.promotion = res.message;
           this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res.message.photo}`);

           if(res.message.types!="Sms"){
             this.isSms=true;
           }
           if(res.message.critere=="Programmer date"){
              this.isProgrammer=true;
           }

           if(res.message.jours){
            this.jours = new Date(res.message.jours).toISOString().split('T')[0];
           }

      } catch (error) {
        console.log("error", error);
      }
    })
  }

  selectSms(event){
    console.log("Event", event);
    if(event=="Sms"){
      this.isSms=false
    }else{
      this.isSms=true
    }
  }

  onFileSelected(event){
    this.file = event.target.files[0];
    this.fileName = this.file.name;
  }

  Pprogrammer(){
    this.isProgrammer =true;
  }
  isInstan(){
    this.isProgrammer = false;
  }

  editPromotion(idPromotion){

    console.log("id", idPromotion);

    this.onLoadForm=true;
    const formData: FormData = new FormData();
    Object.assign(this.promotion, this.firstFormGroup.value);
    Object.assign(this.promotion, this.secondFormGroup.value);
    Object.assign(this.promotion, this.threeFormGroup.value);

    formData.append("uploadfile",this.file);
    formData.append("nom",this.promotion.nom);
    formData.append("types",this.promotion.types);
    formData.append("sms",this.promotion.sms);
    formData.append("email",this.promotion.email);
    formData.append("cible",this.promotion.cible);
    formData.append("critere",this.promotion.critere);
    formData.append("jours",this.promotion.jours);
    formData.append("heure",this.promotion.heure);
    formData.append("condition",this.promotion.condition);
    formData.append("interval1",this.promotion.interval1);
    formData.append("interval2",this.promotion.interval2);
    formData.append("age1",this.promotion.age1);
    formData.append("age2",this.promotion.age2);
    formData.append("sexe",this.promotion.sexe);
    formData.append("region",this.promotion.region);
    formData.append("zone",this.promotion.zone);
    formData.append("nombre",this.promotion.nombre);
    formData.append("etat",this.promotion.etat);

    this.promotionService.updatePromotion(formData,idPromotion).subscribe((res:any)=>{
      try {
        console.log("Response produit", res);
        this.onLoadForm = false;
        this.message=`Votre promotion a été modifiée avec succès.`;
        this.openSnackBar(this.message);
        this.getPromotion();
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
}
