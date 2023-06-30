import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntrepriseService } from '../shared/services/entreprise.service';
import { ClientService } from '../shared/services/client.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';
 import { CustomValidators } from "ng2-validation";


@Component({
  selector: 'app-link-entreprise',
  templateUrl: './link-entreprise.component.html',
  styleUrls: ['./link-entreprise.component.scss']
})
export class LinkEntrepriseComponent implements OnInit {

  idEntreprise:any;
  entreprise:any;
  image:any;
  onLoadForm: boolean = false;
  clientForm: FormGroup;
  clientFormErrors: any;
  submitted: boolean = false;
  client:any;
  clientAdd:any;
  isSucces:boolean = false;

  emailorphone = new FormControl("", [
    Validators.required,
  ]);

  constructor(
    private routes: ActivatedRoute,
    private entrepriseService: EntrepriseService,
    private clientService: ClientService,
    private sanitizer: DomSanitizer
  ) {
     this.routes.params.subscribe((data:any)=>{
      this.idEntreprise = data.idEntreprise;
      //console.log("Data", this.idEntreprise);
     });
     this.clientFormErrors = {
      emailorphone: {},
      nom:{},
      prenom:{},
      genre:{}
    };
  }

  account_validation_messages={
    emailorphone:[
      {
        type: "required",
        message: "Adresse email ou téléphone obligatoire",
      },{
        type:"pattern",
        message: "Identifiant incorrect. Veuillez reessayer.",
      }
    ],

    nom:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],
    prenom:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],
    genre:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],

  };

  onFormValuesChanged(){
    for (const field in this.clientFormErrors){
      if(!this.clientFormErrors.hasOwnProperty(field)){
        continue;
      }
      this.clientFormErrors[field]={};
      const control = this.clientForm.get(field);
      if(control && control.dirty && !control.valid){
        this.clientForm[field] = control.errors;
      }
    }
  }

  ngOnInit(): void {

    this.getEntreprise();

    this.clientForm = new FormGroup({
      emailorphone: new FormControl("",[
        Validators.required,
        Validators.pattern(
          "^((\\+\\d{1,3}(-| )?\\(?\\d\\)?(-| )?\\d{1,5})|(\\(?\\d{2,6}\\)?))(-| )?(\\d{3,4})(-| )?(\\d{4})(( x| ext)\\d{1,5}){0,1}$|(\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,6})+)"
        )
      ]),
      nom:new FormControl("",[Validators.required]),
      prenom:new FormControl("",[Validators.required]),
      genre:new FormControl("",[Validators.required]),
      adresse:new FormControl("",null)

    });
  }

  getEntreprise(){
    this.entrepriseService.sharedEntreprise(this.idEntreprise).subscribe((res:any)=>{

       try {
             //console.log("Entreprise", res);
             this.entreprise = res.message;
             this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res.message.image}`);
       } catch (error) {
          console.log("Erreur", error);
       }
    })
  }

  addClient():void{
    this.onLoadForm = true;
    this.submitted = true;
    this.client = {};

    if(!this.clientForm.invalid){

      Object.assign(this.client, this.clientForm.value);
      this.clientService.sharedEntreprise(this.client, this.entreprise._id).subscribe((res:any)=>{
        if(!res.success){
             this.clientFormErrors["emailorphone"].found = true;
             this.onLoadForm = false;
        }
        else{

          try {
              this.clientAdd = res;
              this.isSucces = true;
          } catch (error) {
            console.log("Erreur ", error);
          }
        }

      })

    }else{
      this.onLoadForm = false;
      this.submitted = false

    }

  }

}
