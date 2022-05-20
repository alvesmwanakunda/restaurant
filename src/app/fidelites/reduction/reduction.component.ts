import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit,Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CadeauService } from 'src/app/shared/services/cadeau.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FidelitesComponent } from '../fidelites.component';

@Component({
  selector: 'app-reduction',
  templateUrl: './reduction.component.html',
  styleUrls: ['./reduction.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-reduction'}
})
export class ReductionComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nom', 'numero', 'date', 'cadeaux','points'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  clients:any=[];
  cadeau:any;
  countCadeau:any;
  nombreCadeau:any;

  constructor(
    private cadeauService: CadeauService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FidelitesComponent>,
  ) { }

  ngOnInit(): void {

    this.getListClient(this.data.id);
    this.getCountNombreCadeau(this.data.id);
    this.getCountPointCadeau(this.data.id);
    this.getCadeau(this.data.id);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Cadeau par page";
  }

  getListClient(idCadeau){
    this.cadeauService.getListDepenseCadeau(idCadeau).subscribe((res:any)=>{
      try {
          this.clients = res.message;
          this.dataSource.data = this.clients.map((data)=>({
            nom: data.client?.user.nom+" "+data.client?.user.prenom,
            numero: data.client?.numeroClient,
            date: data.creation,
            cadeaux: data.nombre,
            points: parseInt(data.cadeau?.point) * parseInt(data.nombre)
          }));
          console.log("Clients", this.clients);
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  getCountNombreCadeau(idCadeau){
    this.cadeauService.getCountNombreCadeau(idCadeau).subscribe((res:any)=>{
      try {
        if(res.cadeau[0]?.nombre){
          this.nombreCadeau = res.cadeau[0]?.nombre;
        }else{
          this.nombreCadeau = 0;
        }
      } catch (error) {
        console.log("Erreur",error);
      }
    })
  }

  getCountPointCadeau(idCadeau){
    this.cadeauService.getCountPointCadeau(idCadeau).subscribe((res:any)=>{
      try {
            this.countCadeau = res.nombre;
            //console.log("Point",  this.countCadeau);
      } catch (error) {
        console.log("Erreur",error);
      }
    })
  }

  getCadeau(idCadeau){

     this.cadeauService.getCadeauMobile(idCadeau).subscribe((res:any)=>{
       try {
          this.cadeau = res.message;
          //console.log("Cadeau",res);
       } catch (error) {
         console.log("Error", error);
       }
     })
  }

}

export interface PeriodicElement {
  nom: string;
  numero: string;
  date: string;
  cadeaux: number;
  points: number;
}

