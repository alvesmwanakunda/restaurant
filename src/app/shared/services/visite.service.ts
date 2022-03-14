import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisiteService {

  constructor(private http:HttpClient) { }

  addVisite(visite:Object, idEntreprise){
    return this.http.post(`${environment.BASE_API_URL}/pointvisite/${idEntreprise}`, visite);
  }

  listVisiteEntreprise(idEntreprise){
    return this.http.get(`${environment.BASE_API_URL}/pointvisite/${idEntreprise}`)
  }

  updateVisite(visite,idVisite){
    return this.http.put(`${environment.BASE_API_URL}/pointvisite/${idVisite}`,visite)
  }

  removeVisite(idVisite){
    return this.http.delete(`${environment.BASE_API_URL}/pointvisite/${idVisite}`)
  }

  getVisite(idVisite){
    return this.http.get(`${environment.BASE_API_URL}/pointvisite/detail/${idVisite}`)
  }
}
