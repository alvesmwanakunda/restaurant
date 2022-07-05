import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageInterface } from 'src/app/shared/interfaces/message.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Types } from 'src/app/shared/class/types';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageClientComponent } from '../message-client.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TestMessageComponent } from '../test-message/test-message.component';
import { DeleteMessageComponent } from '../delete-message/delete-message.component';



@Component({
  selector: 'app-visite-message',
  templateUrl: './visite-message.component.html',
  styleUrls: ['./visite-message.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-visite-message'}
})
export class VisiteMessageComponent implements OnInit {

  messageForm: FormGroup;
  idEntreprise:any;
  messageClient:MessageInterface;
  onLoadForm: boolean = false;
  chargeMessage:boolean = false;
  emptyMessage:boolean = false;
  isUpdateM:boolean=false;
  isReadMore = true;
  message:any;
  file:File;
  fileName:any;
  image:any;
  formDataTest:FormData;
  sendMessage:any;

  // type

  listTypes:any;
  isSms:boolean=false;

  constructor(
    private messageService:MessageService, 
    private entrepriseService:EntrepriseService,
    private _snackBar: MatSnackBar,
    public types: Types,
    private sanitizer: DomSanitizer,
    private messageClientComponent: MessageClientComponent,
    public dialog:MatDialog, 
  ) { }

  ngOnInit(): void {
    //console.log("Bonjour entreprise");

    this.getEntreprise();
    this.listTypes = this.types.listTypes;

    this.messageForm = new FormGroup({
        nom: new FormControl("",[Validators.required]),
        typePromotion:new FormControl("",[Validators.required]),
        message:new FormControl("",[Validators.required]),
        type:new FormControl("Visite",null),
        etat:new FormControl("Envoyer",null),
        automatique:new FormControl("",null),
        isCode:new FormControl('',null)
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

  onFileSelected(event){
    this.file = event.target.files[0];
    this.fileName = this.file.name;
  }

  AddMessage(){
    this.onLoadForm = true;
    this.message = {};
    const formData: FormData = new FormData();
    Object.assign(this.message, this.messageForm.value);
    formData.append("uploadfile",this.file);
    formData.append("nom",this.message.nom);
    formData.append("typePromotion",this.message.typePromotion);
    formData.append("message",this.message.message);
    formData.append("type",this.message.type);
    formData.append("automatique",this.message.automatique);
    formData.append("etat",this.message.etat);
    formData.append("isCode",this.message.isCode);

    if(!this.messageForm.invalid){

      this.messageService.addMessageVisiteApp(formData,this.idEntreprise).subscribe((res:any)=>{
        try {
              this.messageClient = res.message;
              this.onLoadForm = false;
              this.openSnackBarAdd();
              this.chargeMessage = false;
              this.emptyMessage = false;
              this.isUpdateM = false;
              //console.log("reponse", res);
              this.messageClientComponent.messageType(this.message.type,this.idEntreprise);
        } catch (error) {
          console.log("Error", error);
          this.onLoadForm = false;
        }
    })
    }
  }

  updateMessage(message:MessageInterface, idMessage){
    this.onLoadForm = true;

    const formData: FormData = new FormData();
    
    formData.append("uploadfile",this.file);
    formData.append("nom",message.nom);
    formData.append("typePromotion",message.typePromotion);
    formData.append("message",message.message);
    formData.append("type",message.type);
    formData.append("automatique",message.automatique);
    formData.append("isCode",message.isCode);

    
      this.messageService.updateMessageVisiteApp(formData,idMessage).subscribe((res:any)=>{
        try {
              this.messageClient = res.message;
              this.onLoadForm = false;
              this.chargeMessage = false;
              this.emptyMessage = false;
              this.isUpdateM = false;
              this.openSnackBar();
              //console.log("reponse", res);
              this.messageClientComponent.messageType(res.message.type,this.idEntreprise);
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
    this.messageService.getByTypeMessageVisiteApp("Visite",id).subscribe((res:any)=>{
      try {
           this.messageClient = res.message;
           console.log("Message", this.messageClient);
           if(res.message){
               this.chargeMessage=true;
               this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res.message.photo}`);
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

  

  showText(){
    this.isReadMore = !this.isReadMore
  }

  close(){
    this.isUpdateM=false;
  }

  AddMessageTest(){
    this.message = {};
    this.formDataTest = new FormData();
    Object.assign(this.message, this.messageForm.value);
    this.formDataTest.append("uploadfile",this.file);
    this.formDataTest.append("nom",this.message.nom);
    this.formDataTest.append("typePromotion",this.message.typePromotion);
    this.formDataTest.append("message",this.message.message);
    this.formDataTest.append("type",this.message.type);
    this.formDataTest.append("automatique",this.message.automatique);
    this.formDataTest.append("etat","Brouillon");
    this.formDataTest.append("isCode",this.message.isCode);
    this.openDialogAddTest();
  }

  sendMessageTest(idClient){

     this.messageService.addMessageVisiteAppTest(this.formDataTest,this.idEntreprise,idClient).subscribe((res:any)=>{
        try {
             this.sendMessage = "Votre message a été envoyé avec succès";
        } catch (error) {
          console.log("Error", error);
        }
     })
  }

  openDialogAddTest(){
    const dialogRef = this.dialog.open(TestMessageComponent,{width:'40%',data:{id:"Visite"}});
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result){
        let client = JSON.parse(result);
        if(client){
          this.sendMessageTest(client._id);
        }
        //console.log('Dialog result:', client);
      }else{
        console.log('Dialog result');
      }
      
    })
  }

  openDeleteMessage(idMessage){

    const dialogRef = this.dialog.open(DeleteMessageComponent,{width:'30%',data:{id:idMessage,type:"Visite"}});
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result){
        console.log('Dialog result:', result);
        this.messageClientComponent.messageType("Visite",this.idEntreprise);
        this.getMessage(this.idEntreprise);
      }else{
        console.log('Dialog result');
      }
      
    })
    
  }



}
