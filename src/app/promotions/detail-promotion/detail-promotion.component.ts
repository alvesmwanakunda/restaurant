import { Component, OnInit, ViewEncapsulation,Inject } from '@angular/core';
import { PromotionsService } from 'src/app/shared/services/promotions.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-detail-promotion',
  templateUrl: './detail-promotion.component.html',
  styleUrls: ['./detail-promotion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-detail-promotion'}
})
export class DetailPromotionComponent implements OnInit {

  promotion:any;

  constructor(
    private promotionService:PromotionsService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.getPromotion(this.data.idPromotion);
  }

  getPromotion(idPromotion){
     this.promotionService.getPromotion(idPromotion).subscribe((res:any)=>{
       try {
             this.promotion = res.message;
             console.log("Promotion", res);
       } catch (error) {
         console.log("Erreur", error);
       }
     })
  }



}
