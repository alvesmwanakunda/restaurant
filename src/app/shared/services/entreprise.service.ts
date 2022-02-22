import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private http: HttpClient) { }

  getEntrepriseByUser(){
    return this.http.get(`${environment.BASE_API_URL}/entreprise/user`)
  }
}
