import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HoraireService {

  constructor(private http: HttpClient) { }

  addHoraire(body, idEntreprise){
    return this.http.post(`${environment.BASE_API_URL}/horaire/${idEntreprise}`,body)
  }

  getHoraire(idEntreprise){
    return this.http.get(`${environment.BASE_API_URL}/horaire/${idEntreprise}`)
  }

}
