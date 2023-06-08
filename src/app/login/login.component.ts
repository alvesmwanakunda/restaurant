import { Component, OnInit, ViewEncapsulation, OnDestroy, Inject } from '@angular/core';
import { Router} from "@angular/router";
import { AuthService } from '../shared/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';
 import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  onLoadForm: boolean = false;
  loginForm: FormGroup;
  loginFormErrors: any;
  onAuthServiceLogin;
  testValidation: boolean = false;
  user: any;
  private loggedIn: boolean;
  hide = true;
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
  ]);

  emailorphone = new FormControl("", [
    Validators.required,
  ]);
  rememberMe:any;
  verify:any;
  messageverify:any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.loginFormErrors = {
      emailorphone: {},
      password: {},
    };

    this.loginForm = this.formBuilder.group({
      emailorphone: this.emailorphone,
      password:this.password,
      rememberMeControl:[false]
    });
    this.loginForm.valueChanges.subscribe(()=>{
      this.onLoginFormValuesChanged();
    });

  }
  account_validation_messages = {
    emailorphone: [
      {
        type: "pattern",
        message:
          'Identifiant incorrect. Reessayer ou cliquez sur "Identifiant oublie" pour reinitialiser.',
      },
    ],
  };

  ngOnInit(): void {

    //this.cookieService.delete('rememberMe');
    //this.cookieService.delete('token');

    this.rememberMe = this.cookieService.get('rememberMe');
    this.loginForm.get('rememberMeControl').setValue(this.rememberMe);
    if(this.rememberMe){
      this.authService.getVerifyToken(this.cookieService.get('token')).subscribe((res:any)=>{
        console.log("message", res.message);
        try {
          if(res.message=="User not found"){
              this.messageverify="Utilisateur introuvable";
          }else{
              this.authService.setUser(res.message);
              this.handleRedirectOnLogin(res.message);
          }
        } catch (error) {
           console.log("Erreur", error)
        }
      })
    }

  }

  

  handleRedirectOnLogin(user){
    this.router.navigate(["dashboard"]);
  }

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the contro
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  onLogin(): void {
    this.onLoadForm = true;
    if (this.password.value == "" || this.emailorphone.value == "") {
      this.testValidation = true;
      this.onLoadForm = false;
      return;
    }
    this.testValidation = false;

    this.loginFormErrors["emailorphone"].notfound = false;
    this.onAuthServiceLogin = this.authService
      .signin(this.loginForm.value)
      .then((response) => {
        if (!response.success) {
          this.loginFormErrors["emailorphone"].notfound = true;
        } else {
          if(response.message.user.role=="admin_agent"){

            if(this.loginForm.get('rememberMeControl').value==true){
              this.cookieService.set('rememberMe','true');
              this.cookieService.set('token',response.message.token)
            }
            this.authService.setUser(response.message);
            this.handleRedirectOnLogin(response.message);

          }else{
            this.loginFormErrors["emailorphone"].notfound = true;
          }
        }
        this.onLoadForm = false;
      })
      .catch((err) => {
        this.onLoadForm = false;
      });
  }

   signOut(): void {
    if (this.loggedIn) this.authService.logout();
  }

  keyDownFunction(event): void{
    if(event.keyCode === 13){
      this.onLogin();
    }
  }



}
