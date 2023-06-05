import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { EntrepriseService } from '../../shared/services/entreprise.service';
import { ClientService } from 'src/app/shared/services/client.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientsComponent } from '../clients.component';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-upload-client',
  templateUrl: './upload-client.component.html',
  styleUrls: ['./upload-client.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-upload-client'}
})
export class UploadClientComponent implements OnInit {

  fileName="";
  entreprise:any;
  onLoadForm: boolean = false;
  clientAdd:any;

  constructor(
    private entrepriseService: EntrepriseService,
    private clientService: ClientService,
    public dialogRef: MatDialogRef<ClientsComponent>,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.getEntreprise();
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
         this.entreprise = res.body;
      } catch (error) {
        console.log("Erreur ", error);
      }
    })
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
             this.dialogRef.close(this.clientAdd);
             this.openSnackBar();
             this.onLoadForm = false;
        } catch (error) {
           this.onLoadForm = false;
           this.openSnackBarErreur();
           console.log("Erreur", error);
        }
      })
    }
  }

  openSnackBar() {
    this._snackBar.open('Le client(s) ajouter avec succès', 'Fermer', {
      duration: 3000
    });
  }

  openSnackBarErreur() {
    this._snackBar.open('Une erreur s\'est produite lors de \'enregistrement du client.', 'Fermer', {
      duration: 3000
    });
  }

}
