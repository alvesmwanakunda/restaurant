import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from './add-client/add-client.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { ClientService } from '../shared/services/client.service';
import { EntrepriseService } from '../shared/services/entreprise.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ClientInterface } from '../shared/interfaces/client.interface';
import { OperationInterface } from '../shared/interfaces/operation.interface';
import { UploadClientComponent } from './upload-client/upload-client.component';
import { DeleteClientComponent } from './delete-client/delete-client.component';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id','numero', 'nom', 'genre', 'phone', 'visite','depense','point','avoir'];
  dataSource = new MatTableDataSource<OperationInterface>();
  selection = new SelectionModel<OperationInterface>(true, []);

  fileName="";
  onLoadForm: boolean = false;
  clientAdd:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  entreprise:any;
  clients:any=[];
  operations:any=[]

  constructor(
    public dialog:MatDialog,
    private clientService:ClientService,
    private entrepriseService:EntrepriseService
  ) { }

  ngOnInit(): void {
    this.getEntreprise();
  }

  ngAfterViewInit(): void {

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = "Client par page";
  }



  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
         this.entreprise = res.body;
         if(this.entreprise){
           //this.getAllClients(this.entreprise._id);
           this.getOperationClients(this.entreprise._id);
         }
      } catch (error) {
        console.log("Erreur ", error);
      }
    })
  }

  /*getAllClients(idEntreprise){
    this.clientService.getClientsByEntreprise(idEntreprise).subscribe((res:any)=>{
      try {
           this.clients = res.message.clients;
           this.dataSource.data = this.clients.map((data)=>({
              id: data._id,
              numero: data.numeroClient,
              nom: data.user.nom,
              prenom: data.user.prenom,
              phone: data.user.phone,
              genre: data.genre,
              visite: data.nombreVisite,
              depense:data.depense,
              point:data.point,
              avoir:data.avoir
           })) as ClientInterface[];
          
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }*/

  getOperationClients(idEntrepirse){
    this.clientService.getOperationsByEntreprise(idEntrepirse).subscribe((res:any)=>{

      try {
        this.operations = res.message.operations;
        this.dataSource.data = this.operations.map((data)=>({
           id: data.client._id,
           operation:data._id,
           numero: data.client.numeroClient,
           nom: data.user.nom,
           prenom: data.user.prenom,
           phone: data.user.phone,
           genre: data.client.genre,
           visite: data.visite,
           depense:data.depense,
           point:data.point,
           avoir:data.avoir,
        })) as OperationInterface[];
           console.log("resultat", res);
      } catch (error) {
        console.log("Erreur", error);
      }

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddClientComponent,{width:'40%',height:'60%'});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.getOperationClients(this.entreprise._id);
    });
  }

   openDialogUploadClient(){
    const dialogRef = this.dialog.open(UploadClientComponent,{width:'40%',height:'40%'});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.getOperationClients(this.entreprise._id);
    });
  }

  openDialogDetail(idClient){
    const dialogRef = this.dialog.open(DetailClientComponent,{width:'60%',height:'45%',data:{idclient:idClient}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogDelete(idClient){
    const dialogRef = this.dialog.open(DeleteClientComponent,{width:'30%',height:'30%',data:{id:idClient}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getOperationClients(this.entreprise._id);
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
    
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: OperationInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onFileSelected(event){
    const file:File = event.target.files[0];

    if(file){
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("uploadfile", file);

      this.clientService.uploadClient(formData,this.entreprise._id).subscribe((res)=>{
        this.onLoadForm = true;
        try {
             this.clientAdd = res;
             //this.dialogRef.close(this.clientAdd);
             this.getOperationClients(this.entreprise._id);
             this.onLoadForm = false;
        } catch (error) {
           this.onLoadForm = false;
           console.log("Erreur", error);
        }
      })
    }
  }

}



