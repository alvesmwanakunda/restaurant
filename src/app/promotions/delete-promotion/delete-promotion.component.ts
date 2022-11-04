import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { PromotionsComponent } from '../promotions.component';
import { PromotionsService } from 'src/app/shared/services/promotions.service';


@Component({
  selector: 'app-delete-promotion',
  templateUrl: './delete-promotion.component.html',
  styleUrls: ['./delete-promotion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-delete-promotion'}
})
export class DeletePromotionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PromotionsComponent>,
    private promotionService: PromotionsService
  ) { }

  ngOnInit(): void {
  }

  deletepro(){
    this.promotionService.deletePromotion(this.data.id).subscribe((res:any)=>{
      try {
           console.log("Response", res);
           this.dialogRef.close(res);
      } catch (error) {
         console.log("Erreur",error)
      }
    })
  }

}
