import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ParametresComponent } from '../parametres.component';
import { IClient } from '../../shared/interfaces/user.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';
 import { CustomValidators } from "ng2-validation";


@Component({
  selector: 'app-update-personnel',
  templateUrl: './update-personnel.component.html',
  styleUrls: ['./update-personnel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-update-personnel'}
})
export class UpdatePersonnelComponent implements OnInit {

  user:IClient;
  userForm: FormGroup;
  passwordForm: FormGroup
  onLoadForm:boolean=false;
  passwordFormErrors: any;
  hideP = true;
  hidePassword = true;
  type:any;
  submitted = false;

  constructor(
    private authService:AuthService,
    private entrepriseService:EntrepriseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ParametresComponent>,
  ) {
    this.type = this.data.type;
    this.passwordFormErrors = {
      password: {},
      confirmpassword:{}
    };
   }

   account_validation_messages={
   
    confirmpassword: [
      { type: "required", message: "Vous devez confirmer le mot de passe" },
      { type: "minlength", message: "Mot de passe incorrect." },
    ],
    password: [
      { type: "required", message: "Le mot de passe est obligatoire" },
      {
        type: "pattern",
        message:
          "Le mot de passe doit comporter au moins 8 caracteres,une lettre majuscule, une lettre minuscule et un chiffre",
      },
    ],
  }; 

  ngOnInit(): void {

    this.getAgent();

    //update password
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

    this.passwordForm = new FormGroup({
      password:password,
      confirmpassword: confirmpassword,
    });

    this.passwordForm.valueChanges.subscribe(()=>{
      this.onLoginFormValuesChanged();
    });

  }

  getAgent(){
    this.authService.getAgent(this.data.id).subscribe((res:any)=>{
      try {
            this.user = res.message;
            if(this.user){
              this.userForm = new FormGroup({
                nom: new FormControl(this.user.nom,null),
                prenom:new FormControl(this.user.prenom,null),
                poste:new FormControl(this.user.poste,[Validators.required])
              })
            }

      } catch (error) {
         console.log("Erreur", error);
      }
    })
  }

  updateAgent(user:IClient){
    this.onLoadForm = true;
    this.authService.updateAgent(this.data.id,user).subscribe((res:any)=>{
      try {
           //this.user = ;
           //console.log("cadeau", res);
           this.onLoadForm=false;
           this.dialogRef.close(res.message);

      } catch (error) {
        this.onLoadForm=false;
        console.log("Error",error);
      }
    })
  }

  onPasswordUser(user:IClient){
    this.onLoadForm = true;
    this.submitted=true;
    let agent={};
    if(!this.passwordForm.invalid){
      Object.assign(agent, this.passwordForm.value);
      this.authService.updatePasswordAgent(this.data.id,agent).subscribe((res:any)=>{
       try {
         this.onLoadForm = false;
         this.dialogRef.close(res.message);
       }
       catch(error){
         this.onLoadForm=false;
         console.log("Error", error)
       }
      });
    }else{
      this.onLoadForm=false;
    }
  }

  onLoginFormValuesChanged() {
    for (const field in this.passwordFormErrors) {
      if (!this.passwordFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.passwordFormErrors[field] = {};

      // Get the contro
      const control = this.passwordForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.passwordFormErrors[field] = control.errors;
      }
    }
  }

}
