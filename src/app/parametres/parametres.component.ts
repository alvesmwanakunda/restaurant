import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddPersonnelComponent } from './add-personnel/add-personnel.component';
import { IClient } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';
import { EntrepriseService } from '../shared/services/entreprise.service';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AvoirService } from '../shared/services/avoir.service';
import { AvoirInterface } from '../shared/interfaces/avoir.interface';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdatePersonnelComponent } from './update-personnel/update-personnel.component';




@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss']
})
export class ParametresComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nom','prenom','poste','identifiant', 'actions'];
  dataSource = new MatTableDataSource<IClient>();
  idEntreprise:any;
  entreprises:any=[];
  avoir: AvoirInterface;
  avoirForm: FormGroup;
  onLoadForm=false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog:MatDialog, 
    private authService:AuthService, 
    private entrepriseService:EntrepriseService, 
    private avoirService:AvoirService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this.getEntreprise();
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
          this.idEntreprise = res.body._id;
          this.getAllAgent(res.body._id);
          this.getAvoir(res.body._id);
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
          poste:data.poste
       })) as IClient[];
        
      } catch (error) {
        console.log("Erreur", error);
      }

    })
  }

  getAvoir(idEntreprise){

    this.avoirService.getAvoir(idEntreprise).subscribe((res:any)=>{
      try {
          this.avoir = res
          if(this.avoir){

            this.avoirForm = new FormGroup({
              avoir: new FormControl(this.avoir.avoir,[
                Validators.required
              ]),
            })

          }
          
          console.log("Avoir", res);
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  updateAvoir(avoir:AvoirInterface){
    //console.log("update avoir",avoir);
    this.onLoadForm = true;
    this.avoirService.updateAvoir(this.avoir._id,avoir).subscribe((res:any)=>{
      try {
            this.avoir = avoir;
            this.onLoadForm = false;
            this.openSnackBar();
            //console.log("reponse", res);
      } catch (error) {
        console.log("Error", error);
        this.onLoadForm = false;
      }
    })
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddPersonnelComponent,{width:'40%',height:'67%'});
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

  openDialogUpdate(idUser){
    const dialogRef = this.dialog.open(UpdatePersonnelComponent,{width:'50%',height:'55%',data:{id:idUser}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllAgent(this.idEntreprise);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Agent par page";
  }

  openSnackBar() {
    this._snackBar.open('Les avoir modifier avec succès', 'Fermer', {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }

}

