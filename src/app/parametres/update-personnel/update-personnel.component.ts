import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ParametresComponent } from '../parametres.component';
import { IClient } from '../../shared/interfaces/user.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';

@Component({
  selector: 'app-update-personnel',
  templateUrl: './update-personnel.component.html',
  styleUrls: ['./update-personnel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-update-personnel'}
})
export class UpdatePersonnelComponent implements OnInit {

  user:IClient;
  userForm: FormGroup;
  onLoadForm:boolean=false;

  constructor(
    private authService:AuthService,
    private entrepriseService:EntrepriseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ParametresComponent>,
  ) { }

  ngOnInit(): void {

    this.getAgent();
  }

  getAgent(){
    this.authService.getAgent(this.data.id).subscribe((res:any)=>{
      try {
            this.user = res.message;
            if(this.user){
              this.userForm = new FormGroup({
                nom: new FormControl(this.user.nom,null),
                prenom:new FormControl(this.user.prenom,null),
                poste:new FormControl(this.user.poste,[Validators.required])
              })
            }

      } catch (error) {
         console.log("Erreur", error);
      }
    })
  }

  updateAgent(user:IClient){
    this.onLoadForm = true;
    this.authService.updateAgent(this.data.id,user).subscribe((res:any)=>{
      try {
           //this.user = ;
           //console.log("cadeau", res);
           this.onLoadForm=false;
           this.dialogRef.close(res.message);

      } catch (error) {
        this.onLoadForm=false;
        console.log("Error",error);
      }
    })
  }

}
