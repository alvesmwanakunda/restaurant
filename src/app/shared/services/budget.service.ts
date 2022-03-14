import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http:HttpClient) { }

  addBudget(budget:Object, idEntreprise){
    return this.http.post(`${environment.BASE_API_URL}/budget/${idEntreprise}`, budget);
  }

  listBudgetEntreprise(idEntreprise){
    return this.http.get(`${environment.BASE_API_URL}/budget/${idEntreprise}`)
  }

  updateBudget(budget,idBudget){
    return this.http.put(`${environment.BASE_API_URL}/budget/${idBudget}`,budget)
  }

  removeBudget(idBudget){
    return this.http.delete(`${environment.BASE_API_URL}/budget/${idBudget}`)
  }

  getBudget(idBudget){
    return this.http.get(`${environment.BASE_API_URL}/budget/detail/${idBudget}`)
  }
}
