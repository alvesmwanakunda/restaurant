import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { EntrepriseService } from '../../shared/services/entreprise.service';
import { ClientService } from 'src/app/shared/services/client.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
 } from '@angular/forms';
 import { CustomValidators } from "ng2-validation";
 import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import { ClientsComponent } from '../clients.component';




@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-add-client'}
})
export class AddClientComponent implements OnInit {

  entreprise:any;
  onLoadForm: boolean = false;
  clientForm: FormGroup;
  clientFormErrors: any;
  submitted: boolean = false;
  client:any;
  clientAdd:any;

  emailorphone = new FormControl("", [
    Validators.required,
  ]);

  constructor(
       private entrepriseService: EntrepriseService,
       private clientService: ClientService,
       private formBuilder: FormBuilder,
       public dialogRef: MatDialogRef<ClientsComponent>,
       //@Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.clientFormErrors = {
      emailorphone: {},
      nom:{},
      prenom:{}
    };
  }

  account_validation_messages={
    emailorphone:[
      {
        type: "required",
        message: "Adresse email ou téléphone obligatoire",
      },{
        type:"pattern",
        message: "Identifiant incorrect. Veuillez reessayer.",
      }
    ],

    nom:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],
    prenom:[
      {
        type:"required",
        message:"Ce champ est requis"
      }
    ],

  };

  onFormValuesChanged(){
    for (const field in this.clientFormErrors){
      if(!this.clientFormErrors.hasOwnProperty(field)){
        continue;
      }
      this.clientFormErrors[field]={};
      const control = this.clientForm.get(field);
      if(control && control.dirty && !control.valid){
        this.clientForm[field] = control.errors;
      }
    }
  }

  ngOnInit(): void {
    this.getEntreprise();


    this.clientForm = new FormGroup({
      emailorphone: new FormControl("",[
        Validators.required,
        Validators.pattern(
          "^((\\+\\d{1,3}(-| )?\\(?\\d\\)?(-| )?\\d{1,5})|(\\(?\\d{2,6}\\)?))(-| )?(\\d{3,4})(-| )?(\\d{4})(( x| ext)\\d{1,5}){0,1}$|(\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,6})+)"
        )
      ]),
      nom:new FormControl("",[Validators.required]),
      prenom:new FormControl("",[Validators.required]),
      genre:new FormControl("",null),
      adresse:new FormControl("",null)

    });

  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
         //console.log("Response", res);
         this.entreprise = res.body;
      } catch (error) {
        console.log("Erreur ", error);
      }
    })
  }

  addClient():void{
    this.onLoadForm = true;
    this.submitted = true;
    this.client = {};

    if(!this.clientForm.invalid){

      Object.assign(this.client, this.clientForm.value);
      this.clientService.addClient(this.client, this.entreprise._id).subscribe((res:any)=>{
        if(!res.success){
             this.clientFormErrors["emailorphone"].found = true;
             this.onLoadForm = false;
        }
        else{

          try {
              //console.log("Response", res);
              this.clientAdd = res;
              this.dialogRef.close(this.clientAdd);
          } catch (error) {
            console.log("Erreur ", error);
          }
        }

      })

    }else{
      this.onLoadForm = false;
      this.submitted = false

    }

  }

}
