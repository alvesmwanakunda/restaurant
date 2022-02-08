import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./login.component.scss']
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

  email = new FormControl("", [
    Validators.required,
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginFormErrors = {
      email: {},
      password: {},
    };
  }
  account_validation_messages = {
    email: [
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

    if (this.authService.isConnected()) {
      this.router.navigate(['dashboard'])
    }

    this.loginForm = this.formBuilder.group({
      email: this.email,
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
    if (this.password.value == "" || this.email.value == "") {
      this.testValidation = true;
      this.onLoadForm = false;
      return;
    }
    this.testValidation = false;

    this.loginFormErrors["email"].notfound = false;
    //alert(this.loginForm.value);
    this.onAuthServiceLogin = this.authService
      .signin(this.loginForm.value)
      .then((response) => {
        if (!response.success) {
          this.loginFormErrors["email"].notfound = true;
        } else {
          //console.log("Reponse", response.message);
          this.authService.registerCurretUser(response.message);
          this.handleRedirectOnLogin(response.message);
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
