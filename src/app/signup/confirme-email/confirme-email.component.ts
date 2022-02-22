import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { restResponse } from '../../shared/models/restResponse';

@Component({
  selector: 'app-confirme-email',
  templateUrl: './confirme-email.component.html',
  styleUrls: ['./confirme-email.component.scss']
})
export class ConfirmeEmailComponent implements OnInit {

  email:any;
  code:any;
  invalid:boolean=false;
  already:boolean=false;

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParams.token;
    this.email = this.route.snapshot.queryParams.email;
    this.authService.validEmail({code:this.code, email:this.email}).then(res=>{
        let response = <restResponse>res;
        //console.log(response);
        if(!response.success){
          this.already =true;
        }else{
          this.already=false;
        }
      }).catch(err=>{
        console.log("Error", err);
      })
  }

}
