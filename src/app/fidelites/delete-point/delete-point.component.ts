import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FidelitesComponent } from '../fidelites.component';
import { ProduitService } from 'src/app/shared/services/produit.service';

@Component({
  selector: 'app-delete-point',
  templateUrl: './delete-point.component.html',
  styleUrls: ['./delete-point.component.scss']
})
export class DeletePointComponent implements OnInit {

  message="êtes-vous sûr de vouloir supprimer";

  constructor(
    public dialogRef: MatDialogRef<FidelitesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produitServices : ProduitService
  ) { }

  ngOnInit(): void {
    console.log("Data", this.data);
    if(this.data){
      this.getVerifyProduit(this.data.id);
    }
  }

  onClose(){
    this.dialogRef.close(false);
  }

  onCloseDelete(){
    this.dialogRef.close(true);
  }

  getVerifyProduit(idProduit){
    this.produitServices.verifyProduit(idProduit).subscribe((res:any)=>{
      try {
           if(res.message==true){
             this.message="Ce produit est actuellement utilisé pour votre programme de fidélité. Sa suppression entrainera la désactivation des options liées à ce produit";
           }
            console.log("result",res);
      } catch (error) {
        console.log("Erreur", error)
      }
    })
  }


}
