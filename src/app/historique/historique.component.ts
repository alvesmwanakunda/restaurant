import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AvoirService } from '../shared/services/avoir.service';
import { EntrepriseService } from '../shared/services/entreprise.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['nom', 'date', 'dated','scanne','recompense'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  displayedColumnsAvoir: string[] = ['date', 'heure', 'motif', 'montant'];
  dataSourceAvoir = new MatTableDataSource<AvoirElement>();

  displayedColumnsRecompense: string[] = ['date', 'heure', 'nom', 'type','points'];
  dataSourceRecompense = new MatTableDataSource<RecompenseElement>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginatorAvoir: MatPaginator;
  @ViewChild(MatPaginator) paginatorRecompense: MatPaginator;
  isRecompense:boolean=false;
  isVoir:boolean=false;
  isConnexion:boolean=true;
  isFacture:boolean=false;

  entreprise:any;
  avoirs:any=[];
  recompenses:any=[];
  users:any=[];
  filterFormGroup=new FormGroup({
    fromDate: new FormControl(),
    fromEnd:new FormControl()
  });
  get fromDate() {return this.filterFormGroup.get('fromDate').value;}
  get fromEnd() {return this.filterFormGroup.get('fromEnd').value;}

  constructor(
   private avoirService: AvoirService,
   private entrepriseService: EntrepriseService
  ) { }

  ngOnInit(): void {
    this.getEntreprise();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceAvoir.paginator = this.paginatorAvoir;
    this.dataSourceRecompense.paginator = this.paginatorRecompense;
    this.paginator._intl.itemsPerPageLabel = "Données par page";
    this.paginatorAvoir._intl.itemsPerPageLabel = "Données par page";
    this.paginatorRecompense._intl.itemsPerPageLabel = "Données par page";
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
        this.entreprise = res.body;
        if(this.entreprise){
           this.getAvoirs(this.entreprise._id);
           this.getRecompense(this.entreprise._id);
           this.getConnexion(this.entreprise._id);
        }
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  getAvoirs(idEntrepirse){
    this.avoirService.listAvoirEntreprise(idEntrepirse).subscribe((res:any)=>{
      try {
           console.log("Avoirs", res);
           this.avoirs = res.message.reverse();
           this.dataSourceAvoir.data = this.avoirs.map((data)=>({
             date: data.creation,
             heure:data.creation,
             motif:data.motif,
             montant:data.montant,
             statut:data.type
           })) as AvoirElement[]
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  getRecompense(idEntrepirse){
    this.entrepriseService.listRecompense(idEntrepirse).subscribe((res:any)=>{
      try {
           console.log("Recompense", res);
           this.recompenses = res.message.reverse();
           this.dataSourceRecompense.data = this.recompenses.map((data)=>({
             date: data.creation,
             heure:data.creation,
             nom: data.client?.user.nom+" "+data.client?.user.prenom,
             type:data.cadeau?.typeCadeau,
             points:data.cadeau?.point,
           })) as RecompenseElement[];
      } catch (error) {
        console.log("Erreur",error);
      }
    })
  }

  getConnexion(idEntrepirse){
    this.avoirService.listConnexion(idEntrepirse).subscribe((res:any)=>{

      try {
           console.log("Connexion", res);
           this.users = res.message.reverse();
           this.dataSource.data = this.users.map((data)=>({
            nom: data.user?.nom+" "+data.user?.prenom,
            date:data.connexion,
            heure: data.connexion,
            dated:data.deconnexion,
            heured:data.deconnexion,
            scanne:data.scanne,
            recompense:data.recompense
          })) as PeriodicElement[];

      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  applyFilterDate(event:Event){
    console.log("Event", event);
    if(this.isRecompense){
      console.log("Recompense", this.isRecompense);
      this.dataSourceRecompense.filterPredicate = (data, filter):boolean =>{
        if(this.fromDate && this.fromEnd){
          let fromdate = new Date(this.fromDate.getFullYear()+'-'+('0' + (this.fromDate.getMonth() + 1)).slice(-2)+'-'+this.fromDate.getDate());
          let fromEnd = new Date(this.fromEnd.getFullYear()+'-'+('0' + (this.fromEnd.getMonth() + 1)).slice(-2)+'-'+this.fromEnd.getDate());
          let dateenvoi = new Date(data.date);
          console.log("Suis ici", dateenvoi);
          return dateenvoi >= fromdate && dateenvoi <= fromEnd;
        }
        return true;
      }
      this.dataSourceRecompense.filter = ''+Math.random();

    }
    if(this.isVoir){
      console.log("Avoir", this.isVoir);
      this.dataSourceAvoir.filterPredicate = (data, filter):boolean =>{
        if(this.fromDate && this.fromEnd){
          let fromdate = new Date(this.fromDate.getFullYear()+'-'+('0' + (this.fromDate.getMonth() + 1)).slice(-2)+'-'+this.fromDate.getDate());
          let fromEnd = new Date(this.fromEnd.getFullYear()+'-'+('0' + (this.fromEnd.getMonth() + 1)).slice(-2)+'-'+this.fromEnd.getDate());
          let dateenvoi = new Date(data.date);
          console.log("Suis ici", dateenvoi);
          return dateenvoi >= fromdate && dateenvoi <= fromEnd;
        }
        return true;
      }
      this.dataSourceAvoir.filter = ''+Math.random();

    }
    if(this.isConnexion){

      this.dataSource.filterPredicate = (data, filter):boolean =>{
        if(this.fromDate && this.fromEnd){
          let fromdate = new Date(this.fromDate.getFullYear()+'-'+('0' + (this.fromDate.getMonth() + 1)).slice(-2)+'-'+this.fromDate.getDate());
          let fromEnd = new Date(this.fromEnd.getFullYear()+'-'+('0' + (this.fromEnd.getMonth() + 1)).slice(-2)+'-'+this.fromEnd.getDate());
          let dateenvoi = new Date(data.date);
          console.log("Suis ici", dateenvoi);
          return dateenvoi >= fromdate && dateenvoi <= fromEnd;
        }
        return true;
      }
      this.dataSource.filter = ''+Math.random();

    }
    /*this.dataSource.filterPredicate = (data, filter):boolean =>{
      if(this.fromDate && this.fromEnd){
        let fromdate = new Date(this.fromDate.getFullYear()+'-'+('0' + (this.fromDate.getMonth() + 1)).slice(-2)+'-'+this.fromDate.getDate());
        let fromEnd = new Date(this.fromEnd.getFullYear()+'-'+('0' + (this.fromEnd.getMonth() + 1)).slice(-2)+'-'+this.fromEnd.getDate());
        let dateenvoi = new Date(data.date);
        console.log("Suis ici", dateenvoi);
        return dateenvoi >= fromdate && dateenvoi <= fromEnd;
      }
      return true;
    }
    this.dataSource.filter = ''+Math.random();*/
  }

  IsConnexion(){
    this.isConnexion=true;
    this.isFacture=false;
    this.isVoir=false;
    this.isRecompense=false
  }

  ISVoir(){
      this.isConnexion=false;
      this.isFacture=false;
      this.isVoir=true;
      this.isRecompense=false
  }

  IsRecompense(){
    this.isConnexion=false;
    this.isFacture=false;
    this.isVoir=false;
    this.isRecompense=true
  }

  IsFacture(){
    this.isConnexion=false;
    this.isFacture=true;
    this.isVoir=false;
    this.isRecompense=false
    console.log("Facture", this.isFacture);
  }

}


export interface PeriodicElement {
  nom: string;
  date: string;
  heure: string;
  dated: string;
  heured:string
}

export interface AvoirElement {
  date: string;
  heure: string;
  motif: string;
  montant: string;
  statut:string
}

export interface RecompenseElement {
  date: string;
  heure: string;
  nom: string;
  type: string;
  points:string
}


