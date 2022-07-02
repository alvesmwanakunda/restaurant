import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from 'src/app/shared/services/message.service';
import { VisiteMessageComponent } from '../visite-message/visite-message.component';
import { AnniversaireMessageComponent } from '../anniversaire-message/anniversaire-message.component';
import { RelancerMessageComponent } from '../relancer-message/relancer-message.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-test-message',
  templateUrl: './test-message.component.html',
  styleUrls: ['./test-message.component.scss']
})
export class TestMessageComponent implements OnInit {

  userForm: FormGroup;
  message:any;
  error:any;

  constructor(
    private messageService:MessageService,
    public dialogRef: MatDialogRef<VisiteMessageComponent>,
    public dialogRefA: MatDialogRef <AnniversaireMessageComponent>,
    public dialogRefR: MatDialogRef <RelancerMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      phone: new FormControl("",[Validators.required]),
    });

    console.log("Id", this.data);
  }

  AddTestMessage(){
    this.message = {};
    Object.assign(this.message, this.userForm.value);
   
    if(!this.userForm.invalid){
      this.messageService.testMessage(this.message).subscribe((res:any)=>{
        try {
             if(!res.success){
              this.error = res.message;
             }else{
              if(this.data.id=="Visite"){
                this.dialogRef.close(JSON.stringify(res.message));
              }else if(this.data.id=="Anniversaire"){
                this.dialogRefA.close(JSON.stringify(res.message));
              }else{
                this.dialogRefR.close(JSON.stringify(res.message));
              }
             }
              console.log("User",res);
        } catch (error) {
          console.log("Error", error);
        }
    })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
