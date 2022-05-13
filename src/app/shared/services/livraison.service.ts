import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  constructor(private http:HttpClient) { }

  addLivraison(livraison:Object, idEntreprise,type){
    return this.http.post(`${environment.BASE_API_URL}/cadeau/${idEntreprise}/${type}`, livraison);
  }

  listLivraisonEntreprise(idEntreprise){
    return this.http.get(`${environment.BASE_API_URL}/livraison/${idEntreprise}`)
  }

  updateLivraison(livraison,idLivraison){
    return this.http.put(`${environment.BASE_API_URL}/cadeau/${idLivraison}`,livraison)
  }

  removeLivraison(idLivraison){
    return this.http.delete(`${environment.BASE_API_URL}/cadeau/${idLivraison}`)
  }

  getLivraison(idLivraison){
    return this.http.get(`${environment.BASE_API_URL}/cadeau/detail/${idLivraison}`)
  }


}
