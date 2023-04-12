import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/services/client.service';
import { EntrepriseService } from '../shared/services/entreprise.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dash:any;
  client:any;
  promotion:any;

  constructor(private clientService:ClientService, private entrepriseService:EntrepriseService) { }

  ngOnInit(): void {

    this.getEntreprise();

  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
         this.getDashClient(res.body._id);
         this.getDashNumber(res.body._id);
         this.getDashPromotion(res.body._id);
      } catch (error) {
        console.log("Erreur ", error);
      }
    })
  }

  getDashNumber(idEntrepirse){
    this.clientService.getClientsDash(idEntrepirse).subscribe((res:any)=>{
      try {
            this.dash = res;
      } catch (error) {
        console.log("erreur",error)
      }
    })
  }

  getDashClient(idEntrepirse){
    this.clientService.getClientsNDash(idEntrepirse).subscribe((res:any)=>{
      try {
            this.client = res;
      } catch (error) {
        console.log("erreur",error)
      }
    })
  }

  getDashPromotion(idEntrepirse){
    this.clientService.getPromotionDash(idEntrepirse).subscribe((res:any)=>{
      try {
            this.promotion = res;
      } catch (error) {
        console.log("erreur",error)
      }
    })
  }

}

