import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';
 import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import { ParametresComponent } from '../parametres.component';
 import { AuthService } from 'src/app/shared/services/auth.service';
 import { EntrepriseService } from 'src/app/shared/services/entreprise.service';


@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-add-personnel'}
})
export class AddPersonnelComponent implements OnInit {

  onLoadForm: boolean = false;
  agentForm: FormGroup;
  agentFormErrors: any;
  submitted: boolean = false;
  agent:any;
  agentAdd:any;
  entreprise:any;

  emailorphone = new FormControl("", [
    Validators.required,
  ]);

  constructor(
       private authService: AuthService,
       private formBuilder: FormBuilder,
       public dialogRef: MatDialogRef<ParametresComponent>,
       private entrepriseService: EntrepriseService
  ) {
    this.agentFormErrors = {
      emailorphone: {},
      nom:{},
      prenom:{},
      poste:{}
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
    poste:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],

  };

  onFormValuesChanged(){
    for (const field in this.agentFormErrors){
      if(!this.agentFormErrors.hasOwnProperty(field)){
        continue;
      }
      this.agentFormErrors[field]={};
      const control = this.agentForm.get(field);
      if(control && control.dirty && !control.valid){
        this.agentForm[field] = control.errors;
      }
    }
  }


  ngOnInit(): void {
    this.getEntreprise();

    this.agentForm = new FormGroup({
      emailorphone: new FormControl("",[
        Validators.required,
        Validators.pattern(
          "^((\\+\\d{1,3}(-| )?\\(?\\d\\)?(-| )?\\d{1,5})|(\\(?\\d{2,6}\\)?))(-| )?(\\d{3,4})(-| )?(\\d{4})(( x| ext)\\d{1,5}){0,1}$|(\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,6})+)"
        )
      ]),
      nom:new FormControl("",[Validators.required]),
      prenom:new FormControl("",[Validators.required]),
      poste:new FormControl("",[Validators.required]),
    });
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
         //console.log("Response", res);
         this.entreprise = res.body;
      } catch (error) {
        console.log("Erreur ", error);
      }
    })
  }

  addAgent():void{
    this.onLoadForm = true;
    this.submitted = true;
    this.agent = {};

    if(!this.agentForm.invalid){

      Object.assign(this.agent, this.agentForm.value);
      this.authService.addAgent(this.agent, this.entreprise._id).subscribe((res:any)=>{
        if(!res.success){
             this.agentFormErrors["emailorphone"].found = true;
             this.onLoadForm = false;
        }
        else{

          try {
              //console.log("Response", res);
              this.agentAdd = res;
              this.dialogRef.close(this.agentAdd);
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
