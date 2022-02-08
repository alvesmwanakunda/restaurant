import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISession } from '../interfaces/session.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  optionRequete = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
    }),
  };

  constructor(private readonly httpClient: HttpClient, private router: Router,) { }

  private handleError(error:any):Promise<any>{
    console.log("Erreur: ", error);
    localStorage.clear();
    return Promise.reject(error.message || error);
  }

  public signup(credentials){
    return this.httpClient.post(`${environment.BASE_API_URL}/register`, credentials);
  }

  public signin(credentials:Object):Promise<any>{

    return this.httpClient
    .post(`${environment.BASE_API_URL}/auth`,credentials)
    .toPromise()
    .then((response)=> response as Object)
    .catch(this.handleError)
  }

  public lostPassword(credentials:Object):Promise<any>{

    return this.httpClient
    .post(`${environment.BASE_API_URL}/reset`,credentials)
    .toPromise()
    .then((response)=> response as Object)
    .catch(this.handleError)
  }

  public resetPassword(credentials:Object):Promise<any>{

    return this.httpClient
    .post(`${environment.BASE_API_URL}/reset/password`,credentials)
    .toPromise()
    .then((response)=> response as Object)
    .catch(this.handleError)
  }

  registerToken(token:any):void{
    localStorage.setItem('token', token);
  }



  getToken():any{
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
  }

  registerCurretUser(user):void{
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): ISession{
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  registerCurrentSession(session) {
        localStorage.setItem('currentSession', JSON.stringify(session));
  }

  getCurrentSession() {
        return JSON.parse(localStorage.getItem('currentSession'));
  }

  getUserInfo(){

     let user = JSON.parse(localStorage.getItem('currentUser'));
     return user.user;

  }


  clearStorage() {
        localStorage.clear();
  }

  logout() {
     localStorage.removeItem("currentUser");
     localStorage.clear();
     this.router.navigate(["/"]);
  }

  isConnected(): boolean {
        if(this.getToken()) {
            return Boolean(localStorage.getItem('token') == this.getToken().access_token);
        } else {
            return false;
        }
  }

  userExist(email){
      return this.httpClient.post(`${environment.BASE_API_URL}/users/exist`,{
        email:email
      })
  }

}
