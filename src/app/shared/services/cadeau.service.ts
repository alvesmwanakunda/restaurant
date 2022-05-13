import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadeauService {

  constructor(private http:HttpClient) { }

  addCadeau(cadeau:Object, idEntreprise, type){
    return this.http.post(`${environment.BASE_API_URL}/cadeau/${idEntreprise}/${type}`, cadeau);
  }

  listCadeauEntreprise(idEntreprise,type){
    return this.http.get(`${environment.BASE_API_URL}/cadeau/${idEntreprise}/${type}`)
  }

  updateCadeau(cadeau,idCadeau){
    return this.http.put(`${environment.BASE_API_URL}/cadeau/${idCadeau}`,cadeau)
  }

  removeCadeau(idCadeau){
    return this.http.delete(`${environment.BASE_API_URL}/cadeau/${idCadeau}`)
  }

  getCadeau(idCadeau){
    return this.http.get(`${environment.BASE_API_URL}/cadeau/detail/${idCadeau}`)
  }
}
