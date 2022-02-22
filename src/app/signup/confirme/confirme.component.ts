import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { restResponse } from '../../shared/models/restResponse';

@Component({
  selector: 'app-confirme',
  templateUrl: './confirme.component.html',
  styleUrls: ['./confirme.component.scss']
})
export class ConfirmeComponent implements OnInit {

  email:any;
  code:any;
  invalid:boolean=false;
  already:boolean=false;

  constructor(private routes:ActivatedRoute, private authService:AuthService) {
    this.routes.params.subscribe((data:any)=>{
      //console.log('url', data);
      this.email = data.email;
      //this.code = data.token;
    })
   }

  ngOnInit(): void {
    //console.log("Email", this.email);
  }

}
