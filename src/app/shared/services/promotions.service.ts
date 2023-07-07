import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private http:HttpClient) { }

  listPromotions(idEntreprise){
    return this.http.get(`${environment.BASE_API_URL}/promotion/entreprise/${idEntreprise}`)
  }

  getPromotion(idPromotion){
    return this.http.get(`${environment.BASE_API_URL}/promotion/${idPromotion}`)
  }

  deletePromotion(idPromotion){
    return this.http.delete(`${environment.BASE_API_URL}/promotion/${idPromotion}`)
  }

  updatePromotion(promotion,idPromotion){
    return this.http.put(`${environment.BASE_API_URL}/promotion/${idPromotion}`, promotion)
  }

  addPromotion(promotion,idEntreprise){
    return this.http.post(`${environment.BASE_API_URL}/promotion/${idEntreprise}`, promotion)
  }

  filterPromotionSms(idEntreprise){
    return this.http.get(`${environment.BASE_API_URL}/stat/promotion/sms/${idEntreprise}`)
  }

  filterPromotionApp(idEntreprise){
    return this.http.get(`${environment.BASE_API_URL}/stat/promotion/app/${idEntreprise}`)
  }

  getQrcodePromotionGlobal(id){
    return this.http.get(`${environment.BASE_API_URL}/qrcode/promotion/global/${id}`)
  }

}
