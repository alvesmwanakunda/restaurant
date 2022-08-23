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

  updateEntreprise(body, idEntreprise){
    return this.http.put(`${environment.BASE_API_URL}/entreprise/${idEntreprise}`, body)
  }

  uploadLogo(body, idEntreprise){
    return this.http.put(`${environment.BASE_API_URL}/entreprise/image/${idEntreprise}`, body)
  }

  listRecompense(idEntrepirse){
    return this.http.get(`${environment.BASE_API_URL}/web/operation/cadeau/client/${idEntrepirse}`)
  }

  sharedEntreprise(idEntrepirse){
    return this.http.get(`${environment.BASE_API_URL}/shared/entreprise/${idEntrepirse}`);
  }
}
