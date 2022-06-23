import { Component, OnInit } from '@angular/core';
import { Types } from 'src/app/shared/class/types';

@Component({
  selector: 'app-message-client',
  templateUrl: './message-client.component.html',
  styleUrls: ['./message-client.component.scss']
})
export class MessageClientComponent implements OnInit {

  listTypes:any;
  isSms:boolean=false;
  isSms1:boolean=false;
  checked: boolean = true;

  constructor(
    public types: Types,
  ) { }

  ngOnInit(): void {

    this.listTypes = this.types.listTypes;
  }

  selectSms(event){
    console.log("Event", event);
    if(event=="Sms"){
      this.isSms=false
    }else{
      this.isSms=true
    }
  }

  selectSms1(event){
    console.log("Event", event);
    if(event=="Sms"){
      this.isSms1=false
    }else{
      this.isSms1=true
    }
  }

}
