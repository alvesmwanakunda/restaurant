import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvoirService {

  constructor(private http:HttpClient) { }

  updateAvoir(idAvoir, avoir){
    return this.http.put(`${environment.BASE_API_URL}/avoir/${idAvoir}`,avoir)
  }
  
  getAvoir(idAvoir){
    return this.http.get(`${environment.BASE_API_URL}/avoir/${idAvoir}`)
  }

  listAvoirEntreprise(idEntreprise){
     return this.http.get(`${environment.BASE_API_URL}/list/avoir/entreprise/${idEntreprise}`)
  }

  listConnexion(idEntrepirse){
    return this.http.get(`${environment.BASE_API_URL}/connexion/${idEntrepirse}`)
  }
}
