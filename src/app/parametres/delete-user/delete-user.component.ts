import { Component, OnInit,ViewEncapsulation,Inject } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ParametresComponent } from '../parametres.component';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-delete-user'}
})
export class DeleteUserComponent implements OnInit {

  idEntreprise:any;

  constructor(
    private authService:AuthService,
    private entrepriseService:EntrepriseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ParametresComponent>,
    ) 
    { }

  ngOnInit(): void {
    this.getEntreprise();
    //console.log("User", this.data.id);
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

  deleteAgent(){
    this.authService.deleteAgent(this.data.id, this.idEntreprise).subscribe((res:any)=>{
      try {
           console.log("Response", res);
           this.dialogRef.close(res);
      } catch (error) {
         console.log("Erreur",error)
      }
    })
  }

}
