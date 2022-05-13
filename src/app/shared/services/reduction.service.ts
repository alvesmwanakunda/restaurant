import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReductionService {

  constructor(private http:HttpClient) { }

  listReductionEntreprise(idEntreprise){
    return this.http.get(`${environment.BASE_API_URL}/reduction/${idEntreprise}`)
  }

  addReduction(reduction:Object, idEntreprise,type){
    return this.http.post(`${environment.BASE_API_URL}/cadeau/${idEntreprise}/${type}`, reduction);
  }

  updateReduction(reduction,idReduction){
    return this.http.put(`${environment.BASE_API_URL}/cadeau/${idReduction}`,reduction)
  }

  removeReduction(idReduction){
    return this.http.delete(`${environment.BASE_API_URL}/cadeau/${idReduction}`)
  }

  getReduction(idReduction){
    return this.http.get(`${environment.BASE_API_URL}/cadeau/detail/${idReduction}`)
  }
}
