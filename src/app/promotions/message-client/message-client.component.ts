import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Types } from 'src/app/shared/class/types';
import { MatStepper } from '@angular/material/stepper';
import { MessageService } from 'src/app/shared/services/message.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';

@Component({
  selector: 'app-message-client',
  templateUrl: './message-client.component.html',
  styleUrls: ['./message-client.component.scss']
})
export class MessageClientComponent implements OnInit, AfterViewInit {

  listTypes:any;
  selectedStepIndex:any;
  message:any;
  entreprise:any;
  qrcode:any;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  constructor(
    public types: Types,
    private messageService: MessageService,
    private entrepriseService: EntrepriseService
  ) { }

  ngOnInit(): void {

    this.listTypes = this.types.listTypes;
    this.getEntreprise();
  }

  ngAfterViewInit():void{

    setTimeout(() => {
      this.stepper.steps.forEach((step, idx) => {
          step.select = () => {
              // Your custom code here
              // if you want to change step do execute code below
              this.selectedStepIndex = idx;
              console.log("Index", idx);
              if(!idx || idx==0){
                 //console.log("Bonjour Visite");
                 this.messageType("Visite", this.entreprise?._id);
                 this.getQrcodePromotion(this.entreprise?._id,"Visite");
              }else if(idx==1){
                //console.log("Bonjour Anniversaire");
                this.messageType("Anniversaire", this.entreprise?._id);
                this.getQrcodePromotion(this.entreprise?._id,"Anniversaire");
              }else{
                this.messageType("Relancer", this.entreprise?._id);
                this.getQrcodePromotion(this.entreprise?._id,"Relancer");
                 //console.log("Bonjour Relancer");
              }
          };
      });
  });
  }

 getEntreprise(){
   this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
    try {
         this.entreprise = res.body;
         if(this.entreprise){
           this.messageType("Visite", this.entreprise._id);
           this.getQrcodePromotion(this.entreprise?._id,"Visite");
         }
    } catch (error) {
      console.log("Erreur", error);
    }
   })
 } 

 messageType(type:String, idEntreprise){
     this.messageService.getByTypeMessageVisiteApp(type, idEntreprise).subscribe((res:any)=>{
       try {
           this.message = res.message;
       } catch (error) {
         console.log("Erreur", error);
       }

     })
 }

 getQrcodePromotion(idEntrepirse,type:String){
  this.messageService.getQrcodePromotion(idEntrepirse,type).subscribe((res:any)=>{
    try {
         console.log("Qrcode Alves", res);
         if(res.success==true){
          this.qrcode = res.qrCode;
         }
    }catch(error){
      console.log("Erreur", error);
    }
  })
 }

  

}
