import { Component, OnInit,ViewEncapsulation,Inject } from '@angular/core';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ClientService } from 'src/app/shared/services/client.service';
import { ClientsComponent } from '../clients.component';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-delete-client'}
})
export class DeleteClientComponent implements OnInit {

  idEntreprise:any;


  constructor(
    private entrepriseService:EntrepriseService,
    private clientService:ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientsComponent>,
  ) { }

  ngOnInit(): void {
    this.getEntreprise();
    //console.log("id", this.data);
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
          this.idEntreprise = res.body._id;
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  deleteClient(){
    this.clientService.deleteClient(this.data.id, this.idEntreprise).subscribe((res:any)=>{
      try {
           console.log("Response", res);
           this.dialogRef.close(res);
      } catch (error) {
         console.log("Erreur",error)
      }
    })
  }


}
