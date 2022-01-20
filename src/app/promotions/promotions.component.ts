import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DetailPromotionComponent } from './detail-promotion/detail-promotion.component';


@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['nom', 'programation', 'envoi', 'cible', 'type','montant', 'activation','payement','statut'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

   openDialog(){
    const dialogRef = this.dialog.open(DetailPromotionComponent,{width:'70%',height:'80'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
export interface PeriodicElement {
  nom: string;
  programation: string;
  envoi: string;
  cible: string;
  type: string;
  montant: string;
  activation: string;
  payement: string;
  statut: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
  {nom:"Bière Heineken", programation: '12/02/21 à 18H55', envoi:'12/02/21', cible: '20 000', type:'SMS', montant:'6840', activation:'Programmé', payement:'Payé', statut:'En attente'},
];
