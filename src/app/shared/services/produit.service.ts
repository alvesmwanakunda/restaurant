import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http:HttpClient) { }

  addProduit(produit:Object, idEntrepirse){
    return this.http.post(`${environment.BASE_API_URL}/produit/entreprise/${idEntrepirse}`, produit);
  }

  listProduit(idEntrepirse){
     return this.http.get(`${environment.BASE_API_URL}/produit/${idEntrepirse}`);
  }

  removeProduit(idProduit){
    return this.http.delete(`${environment.BASE_API_URL}/produit/${idProduit}`);
  }

  updateProduit(produit:Object,idProduit){
    return this.http.put(`${environment.BASE_API_URL}/produit/${idProduit}`, produit);
  }

  getProduit(idProduit){
    return this.http.get(`${environment.BASE_API_URL}/get/produit/${idProduit}`);
  }

  verifyProduit(idProduit){
    return this.http.get(`${environment.BASE_API_URL}/verify/cadeau/produit/${idProduit}`);
 }

}
