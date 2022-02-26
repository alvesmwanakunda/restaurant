import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddPersonnelComponent } from './add-personnel/add-personnel.component';
import { IClient } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';
import { EntrepriseService } from '../shared/services/entreprise.service';
import { DeleteUserComponent } from './delete-user/delete-user.component';


@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss']
})
export class ParametresComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nom', 'identifiant', 'actions'];
  dataSource = new MatTableDataSource<IClient>();
  idEntreprise:any;
  entreprises:any=[]

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog:MatDialog, private authService:AuthService, private entrepriseService:EntrepriseService) { }

  ngOnInit(): void {

    this.getEntreprise();
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
          this.idEntreprise = res.body._id;
          this.getAllAgent(res.body._id);
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  getAllAgent(idEntreprise){
    this.authService.listAgent(idEntreprise).subscribe((res:any)=>{

      try {

         this.entreprises = res.message;
         this.dataSource.data = this.entreprises.map((data)=>({
          id: data._id,
          nom: data.nom,
          prenom: data.prenom,
          phone: data.phone,
          email:data.email,
       })) as IClient[];
        
      } catch (error) {
        console.log("Erreur", error);
      }

    })
  }



  openDialog(){
    const dialogRef = this.dialog.open(AddPersonnelComponent,{width:'40%',height:'55%'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllAgent(this.idEntreprise);
    })
  }

  openDialogDelete(idUser){
    const dialogRef = this.dialog.open(DeleteUserComponent,{width:'30%',height:'30%',data:{id:idUser}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllAgent(this.idEntreprise);
    })
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Agent par page";
  }

}

