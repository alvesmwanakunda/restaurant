import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISession } from '../interfaces/session.interface';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();
  verify:any;

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

  public validCode(code:Object):Promise<any>{
    return this.httpClient
     .post(`${environment.BASE_API_URL}/validcode`, code)
     .toPromise()
     .then((response)=> response as Object)
     .catch(this.handleError)
  }

  public validEmail(email:Object):Promise<any>{
    return this.httpClient
     .post(`${environment.BASE_API_URL}/validemail`, email)
     .toPromise()
     .then((response)=> response as Object)
     .catch(this.handleError)
  }


  setUser(user: Object): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem("user"));
  }

  getToken(): any {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.token;
  }

  getTokenValue(): any {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.token) {
        return this.jwtHelper.decodeToken(user.token);
      } else {
        return null;
      }
    } catch (error) {
      console.log("une erreur : ", error);
    }
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

  updatePassword(body){
    return this.httpClient.post(`${environment.BASE_API_URL}/profil/password`,body)
  }

  listAgent(idEntreprise){
    return this.httpClient.get(`${environment.BASE_API_URL}/agent/entreprise/${idEntreprise}`)
  }

  getAgent(idUser){
    return this.httpClient.get(`${environment.BASE_API_URL}/agent/${idUser}`)
  }

  getPasswordAgent(idUser){
    return this.httpClient.get(`${environment.BASE_API_URL}/password/agent/${idUser}`)
  }

  getVerifyToken(token){
    return this.httpClient.get(`${environment.BASE_API_URL}/verifyRememberWeb/${token}`)
  }

  deleteVerifyToken(){
    return this.httpClient.get(`${environment.BASE_API_URL}/deleteRememberWeb`)
  }

  updateAgent(idUser, body){
    return this.httpClient.put(`${environment.BASE_API_URL}/agent/${idUser}`,body)
  }

  updatePasswordAgent(idUser,body){
    return this.httpClient.put(`${environment.BASE_API_URL}/agent/update/password/${idUser}`,body)
  }

  addAgent(body,idEntreprise){
    return this.httpClient.post(`${environment.BASE_API_URL}/register/agent/entreprise/${idEntreprise}`,body)
  }

  deleteAgent(idUser,idEntreprise){
    return this.httpClient.delete(`${environment.BASE_API_URL}/delete/agent/entreprise/${idUser}/${idEntreprise}`)
  }



}
