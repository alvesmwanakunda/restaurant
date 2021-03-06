import { Component, OnInit, ViewEncapsulation, OnDestroy, Inject } from '@angular/core';
import { Router} from "@angular/router";
import { AuthService } from '../shared/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,

  ) {
    this.loginFormErrors = {
      emailorphone: {},
      password: {},
    };
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
    localStorage.clear();
    this.signOut();

    /*if (this.authService.isConnected()) {
      this.router.navigate(['dashboard'])
    }*/

    this.loginForm = this.formBuilder.group({
      emailorphone: this.emailorphone,
      password:this.password,
    });
    this.loginForm.valueChanges.subscribe(()=>{
      this.onLoginFormValuesChanged();
    });

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
    //alert(this.loginForm.value);
    this.onAuthServiceLogin = this.authService
      .signin(this.loginForm.value)
      .then((response) => {
        if (!response.success) {
          this.loginFormErrors["emailorphone"].notfound = true;
        } else {
          console.log("Reponse", response.message);
          //this.authService.registerCurretUser(response.message);
          if(response.message.user.role=="admin_agent"){

            this.authService.setUser(response.message);
            this.handleRedirectOnLogin(response.message);

          }else{
            this.loginFormErrors["emailorphone"].notfound = true;
          }
        }
        this.onLoadForm = false;
      })
      .catch((err) => {
        //console.log("err", err);
        this.onLoadForm = false;
      });
  }

   signOut(): void {
    if (this.loggedIn) this.authService.logout();
  }



}
