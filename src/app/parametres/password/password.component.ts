import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from "ng2-validation";
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-password'}
})
export class PasswordComponent implements OnInit {

  passwordForm: FormGroup;
  hideP = true;
  hidePassword = true;
  onLoadForm:boolean=false;
  user:any
  submitted = false;

  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ) { }

    account_validation_messages={
   
      confirmpassword: [
        { type: "required", message: "Vous devez confirmer le mot de passe" },
        { type: "minlength", message: "Mot de passe incorrect." },
      ],
      password: [
        { type: "required", message: "Le mot de passe est obligatoire" },
       // { type: "minlength", message: "Mot de passe incorrect. " },
        {
          type: "pattern",
          message:
            "Le mot de passe doit comporter au moins 8 caracteres,une lettre majuscule, une lettre minuscule et un chiffre",
        },
      ],
      
    };  

  ngOnInit(): void {

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
  }

  onPasswordUser():void{
    this.onLoadForm = true;
    this.submitted = true;
    this.user = {};
    if(!this.passwordForm.invalid){
      Object.assign(this.user, this.passwordForm.value);
      this.authService.updatePassword(this.user).subscribe((res:any)=>{
        console.log("Response 1", res);
        this.onLoadForm = false;
        this.openSnackBar();
      });
    }else{
      this.onLoadForm=false;
    }
  }

  openSnackBar() {
    this._snackBar.open('Le mot de passe modifier avec succès', 'Fermer', {
      duration: 3000
    });
  }

}
