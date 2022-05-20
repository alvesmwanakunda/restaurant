import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private http: HttpClient, private authService: AuthService) { }


    addClient(client:Object, idEntreprise){
      return this.http.post(`${environment.BASE_API_URL}/client/${idEntreprise}`, client);
    }

    uploadClient(file, idEntreprise){
      return this.http.post(`${environment.BASE_API_URL}/upload/client/${idEntreprise}`, file);
    }

    getClientsByEntreprise(idEntrepirse){
      return this.http.get(`${environment.BASE_API_URL}/clients/entreprise/${idEntrepirse}`);
    }

    getClientById(idClient){
      return this.http.get(`${environment.BASE_API_URL}/client/${idClient}`);
    }

    deleteClient(idClient,idEntreprise){
      return this.http.delete(`${environment.BASE_API_URL}/delete/client/entreprise/${idClient}/${idEntreprise}`)
    }

    getOperationsByEntreprise(idEntrepirse){
      return this.http.get(`${environment.BASE_API_URL}/operations/${idEntrepirse}`);
    }

    getOperationById(idClient){
      return this.http.get(`${environment.BASE_API_URL}/operation/${idClient}`);
    }

    listCadeauByUser(idUser, idEntrepirse){
      return this.http.get(`${environment.BASE_API_URL}/cadeau/visite/${idUser}/${idEntrepirse}`);
    }


}
