import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { FormControl, FormGroup } from "@angular/forms";
import { MessageInterface } from 'src/app/shared/interfaces/message.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Types } from 'src/app/shared/class/types';

@Component({
  selector: 'app-anniversaire-message',
  templateUrl: './anniversaire-message.component.html',
  styleUrls: ['./anniversaire-message.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-anniversaire-message'}
})
export class AnniversaireMessageComponent implements OnInit {

  messageForm: FormGroup;
  idEntreprise:any;
  messageClient:MessageInterface;
  onLoadForm: boolean = false;
  chargeMessage:boolean = false;
  emptyMessage:boolean = false;
  isUpdateM:boolean=false;

  // type

  listTypes:any;
  isSms:boolean=false;

  constructor(
    private messageService:MessageService, 
    private entrepriseService:EntrepriseService,
    private _snackBar: MatSnackBar,
    public types: Types,
  ) { }

  ngOnInit(): void {

    this.getEntreprise();
    this.listTypes = this.types.listTypes;

    this.messageForm = new FormGroup({
        nom: new FormControl("",null),
        typePromotion:new FormControl("",null),
        message:new FormControl("",null),
        type:new FormControl("Anniversaire",null)
    })
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      
      try {
           this.idEntreprise = res.body._id;
           if(this.idEntreprise){
            this.getMessage(this.idEntreprise);
           }
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  AddMessage(){
    this.onLoadForm = true;
    let message = {};

    Object.assign(message, this.messageForm.value);
    
      this.messageService.addMessageVisiteApp(message,this.idEntreprise).subscribe((res:any)=>{
        try {
              this.messageClient = res.message;
              this.onLoadForm = false;
              this.openSnackBarAdd();
              this.chargeMessage = false;
              this.emptyMessage = false;
              this.isUpdateM = false;
              console.log("reponse", res);
        } catch (error) {
          console.log("Error", error);
          this.onLoadForm = false;
        }
      })
    
  }

  updateMessage(message:MessageInterface, idMessage){
    this.onLoadForm = true;
    
      this.messageService.updateMessageVisiteApp(message,idMessage).subscribe((res:any)=>{
        try {
              this.messageClient = message;
              this.onLoadForm = false;
              this.chargeMessage = false;
              this.emptyMessage = false;
              this.isUpdateM = false;
              this.openSnackBar();
              console.log("reponse", res);
        } catch (error) {
          console.log("Error", error);
          this.onLoadForm = false;
        }
      })
    
  }

  selectSms(event){
    console.log("Event", event);
    if(event=="Sms"){
      this.isSms=false
    }else{
      this.isSms=true
    }
  }

  openSnackBarAdd() {
    this._snackBar.open('Message ajouter avec succès', 'Fermer', {
      duration: 3000
    });
  }

  openSnackBar() {
    this._snackBar.open('Message modifier avec succès', 'Fermer', {
      duration: 3000
    });
  }

  getMessage(id){
    this.messageService.getByTypeMessageVisiteApp("Anniversaire",id).subscribe((res:any)=>{
      try {
           this.messageClient = res.message;
           console.log("Message", this.messageClient);
           if(res.message){
               this.chargeMessage=true;
           }else{
              this.emptyMessage=true; 
           }
      } catch (error) {
        console.log("Erreur", error)
      }
    })
  }

  openMessage(){
    this.isUpdateM = true;
    this.getMessage(this.idEntreprise);
  }

}
