import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VisiteMessageComponent } from '../visite-message/visite-message.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageClientComponent } from '../message-client.component';



@Component({
  selector: 'app-delete-message',
  templateUrl: './delete-message.component.html',
  styleUrls: ['./delete-message.component.scss']
})
export class DeleteMessageComponent implements OnInit {

  message:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService:MessageService,
    public dialogRef: MatDialogRef<VisiteMessageComponent>,
    //private messageClientComponent: MessageClientComponent,
  ) { }

  ngOnInit(): void {

    console.log("Id", this.data);
    this.getMessage();
  }

  getMessage(){
    this.messageService.getMessageVisiteApp(this.data.id).subscribe((res:any)=>{
      try {
           this.message = res.message;
           console.log("Message", res);
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  deleteMessage(){
    this.messageService.deleteMessageVisiteApp(this.data.id).subscribe((res:any)=>{
      try {
            if(this.data.type=="Visite"){
              this.dialogRef.close(res.message);
            }else if(this.data.type=="Anniversaire"){
              this.dialogRef.close(res.message);
            }else{
              this.dialogRef.close(res.message);
            }
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
