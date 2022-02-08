import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private http: HttpClient, private authService: AuthService) { }

  token = this.authService.getToken();
  reqHeader = new HttpHeaders({
        Authorization: "Bearer " + this.token.token,
    });

    getInfo(){
      console.log("Token", this.token.token);
    }
}
