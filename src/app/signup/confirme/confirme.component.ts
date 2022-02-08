import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-confirme',
  templateUrl: './confirme.component.html',
  styleUrls: ['./confirme.component.scss']
})
export class ConfirmeComponent implements OnInit {

  email:any;

  constructor(private routes:ActivatedRoute) {
    this.routes.params.subscribe((data:any)=>{
      //console.log('url', data);
      this.email = data.email;
    })
   }

  ngOnInit(): void {
    //console.log("Email", this.email);
  }

}
