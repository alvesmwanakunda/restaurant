import { Component, OnInit, ViewEncapsulation,ViewChild, AfterViewInit, Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientService } from 'src/app/shared/services/client.service';


@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-detail-client'}
})
export class DetailClientComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['recompense', 'detail', 'date', 'heure','point'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  client:any;
  operation:any;
  cadeaux:any=[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  isRecompense:boolean=false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private clientService:ClientService) { }

  ngOnInit(): void {

    console.log("Idclient", this.data);
    this.getClient(this.data.idclient);
    this.getOperationByClient(this.data.idclient);
    //this.listRecompense(this.data.idclient, this.data.idEntreprise);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Recompense par page";
  }

  isOpenR(){
    if(this.isRecompense){
       this.isRecompense = false;
    }else{
      this.isRecompense = true;
    }
  }

  getClient(idClient){
    this.clientService.getClientById(idClient).subscribe((res:any)=>{
      try {
          this.client = res.message.client;
          console.log("Client", this.client);
          if(this.client){
            this.listRecompense(this.client.user?._id, this.data.idEntreprise);
          }
      } catch (error) {
        console.log("Error", error)
      }
    })

  }

  getOperationByClient(idClient){

    this.clientService.getOperationById(idClient).subscribe((res:any)=>{
      try {

          this.operation = res.message;
          console.log("Operation", this.operation);

      } catch (error) {
        console.log("Error", error)
      }
    })
  }

  listRecompense(idClient,idEntrepirse){
     this.clientService.listCadeauByUser(idClient,idEntrepirse).subscribe((res:any)=>{
       try {
             this.cadeaux = res.cadeau;
             console.log("Les cadeaux", this.cadeaux);
             this.dataSource.data = this.cadeaux.map((data)=>({
                recompense: data.typeCadeau,
                date:data.dateCreation,
                heure:data.dateCreation,
                type:data.typeCadeau,
                point:data.point,
                livraison:data.nombreLivraison,
                montant:data.montant,
                devise:data.devise,
                produit:data.produit?.nom,
                typepoint:data.typesPoint?.nom
             }))as PeriodicElement[];
       } catch (error) {
         console.log("Erreur", error);
       }
     })
  }

}

export interface PeriodicElement {
  recompense: string;
  date: string;
  heure: string;
  type:string;
  point:number;
  livraison:number;
  montant:number;
  devise:string;
  produit:string;
  typepoint:string;
}

