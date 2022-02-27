import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  lostpasswordForm: FormGroup;
  submitted=false;
  formErrors:any;
  isMailLoading:boolean=false;
  passwordchangedok:boolean=false;
  accountnotfound:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}


  account_validation_messages={
     emailorphone:[
       {
         type:"required",
         message:"Adresse email obligatoire"
       },
       {
         type:"pattern",
         message:"Veuillez respecter le format email"
       }
     ]
  };

  ngOnInit(): void {

    this.lostpasswordForm = this.formBuilder.group({
      emailorphone:[
        "",
        [
          Validators.required,
          Validators.pattern(
            "^((\\+\\d{1,3}(-| )?\\(?\\d\\)?(-| )?\\d{1,5})|(\\(?\\d{2,6}\\)?))(-| )?(\\d{3,4})(-| )?(\\d{4})(( x| ext)\\d{1,5}){0,1}$|(\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,6})+)"
          )
        ]

      ]
    });
  }

  onLostPassword(){

    this.isMailLoading = true;
    this.authService.lostPassword(this.lostpasswordForm.value)
         .then(res => {
           console.log("Response ", res);
           if(!res.success){
            this.isMailLoading = false;
            this.accountnotfound = true;
           } else{
             let emailregex = RegExp(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
             );
             let email = this.lostpasswordForm.get("emailorphone").value;
             if(!emailregex.test(email)){
                this.isMailLoading = false;
                this.accountnotfound = false;
             }else{
               this.isMailLoading = false;
               this.passwordchangedok = true;
               this.accountnotfound = false;
             }
           }
         })
         .catch(err=>{
           console.log("Error", err);
         })
  }

}
