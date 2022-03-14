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
}
