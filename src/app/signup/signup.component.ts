import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomValidators } from "ng2-validation";
import { restResponse } from './../shared/models/restResponse';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  hideP = true;
  hidePassword = true;
  cgu:boolean=false;
  onLoadForm:boolean=false;
  isForm:boolean=false;
  signupForm: FormGroup;
  submitted = false;
  signupFormErrors:any;
  errorMessage: string="";
  user:any


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
  ) {
    this.signupFormErrors={
      entreprise:{},
      //phone:{},
      emailorphone:{},
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
    /*phone:[
      {
        type:"required",
        message:"Téléphone obligatoire",
      },
      {
        type:"pattern",
        message:"Téléphone incorrect."
      }
    ],*/
    categorie:[

      {
        type:"required",
        message:"Ce champ est requis"
      }

    ],
    entreprise:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],
    confirmpassword: [
      { type: "required", message: "Vous devez confirmer le mot de passe" },
      { type: "minlength", message: "Mot de passe incorrect." },
    ],
    password: [
      { type: "required", message: "Le mot de passe est obligatoire"},
      { type: "minlength", message: "Mot de passe incorrect."},
      {
        type: "pattern",
        message:
          "Le mot de passe doit comporter au moins 8 caracteres,une lettre majuscule, une lettre minuscule et un chiffre",
      },
    ],
    terms: [
      {
        type: "pattern",
        message: "Lire et accepter la déclaration de confidentialité. .",
      },
    ],
  };

  onFormValuesChanged(){
    for (const field in this.signupFormErrors){
      if(!this.signupFormErrors.hasOwnProperty(field)){
        continue;
      }
      this.signupFormErrors[field]={};
      const control = this.signupForm.get(field);
      if(control && control.dirty && !control.valid){
        this.signupForm[field] = control.errors;
      }
    }
  }

  ngOnInit(): void {
    this.isForm = false;
    this.errorMessage="";

    let password = new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?![#?!@$%^&*-]).{8,}$"
      ),
    ]);
    let confirmpassword = new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      CustomValidators.equalTo(password),
    ]);

    this.signupForm = new FormGroup({
      emailorphone: new FormControl("",[
        Validators.required,
        Validators.pattern(
          "^((\\+\\d{1,3}(-| )?\\(?\\d\\)?(-| )?\\d{1,5})|(\\(?\\d{2,6}\\)?))(-| )?(\\d{3,4})(-| )?(\\d{4})(( x| ext)\\d{1,5}){0,1}$|(\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,6})+)"
        )
      ]),

      categorie:new FormControl("",[Validators.required]),
      entreprise:new FormControl("",[Validators.required]),
      password:password,
      confirmpassword: confirmpassword,
      cgu: new FormControl("", [CustomValidators.equal(true)])
    });
  }

  onRegisterUser():void{
    this.onLoadForm = true;
    this.submitted = true;
    this.user = {};
    console.log("Form", this.signupForm);
    if(!this.signupForm.invalid){
      //console.log("User", this.user);

      Object.assign(this.user, this.signupForm.value);
      this.authService.signup(this.user).subscribe((res:any)=>{
        //console.log("Response", res);
        let response = <restResponse>res;
        console.log("Response 1", response);
        if(!res.success){
          this.signupFormErrors["emailorphone"].found = true;
        }else{
          if(response.message["phone"]){
            this.isForm=true;
            this.router.navigate(["confirmephone", response.message["phone"]]);
          }else{
            this.isForm=true;
            this.router.navigate(["confirme", response.message["email"]]);
          }
        }
        this.onLoadForm = false;
      });
    }else{
      this.onLoadForm=false;
    }
  }
}
