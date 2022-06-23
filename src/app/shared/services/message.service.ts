import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  addMessageVisiteApp(message:Object,idEntreprise){
    return this.http.post(`${environment.BASE_API_URL}/message/client/${idEntreprise}`, message)
  }

  updateMessageVisiteApp(message,id){
    return this.http.put(`${environment.BASE_API_URL}/message/client/${id}`, message)
  }

  deleteMessageVisiteApp(id){
    return this.http.delete(`${environment.BASE_API_URL}/message/client/${id}`)
  }

  getMessageVisiteApp(id){
    return this.http.get(`${environment.BASE_API_URL}/message/client/${id}`)
  }

  getByTypeMessageVisiteApp(type,idEntrepirse){
    return this.http.get(`${environment.BASE_API_URL}/message/client/${type}/${idEntrepirse}`)
  }


}
