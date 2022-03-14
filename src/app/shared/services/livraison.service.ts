import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  constructor(private http:HttpClient) { }

  addLivraison(livraison:Object, idEntreprise){
    return this.http.post(`${environment.BASE_API_URL}/livraison/${idEntreprise}`, livraison);
  }

  listLivraisonEntreprise(idEntreprise){
    return this.http.get(`${environment.BASE_API_URL}/livraison/${idEntreprise}`)
  }

  updateLivraison(livraison,idLivraison){
    return this.http.put(`${environment.BASE_API_URL}/livraison/${idLivraison}`,livraison)
  }

  removeLivraison(idLivraison){
    return this.http.delete(`${environment.BASE_API_URL}/livraison/${idLivraison}`)
  }

  getLivraison(idLivraison){
    return this.http.get(`${environment.BASE_API_URL}/livraison/detail/${idLivraison}`)
  }


}
