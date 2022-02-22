import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { restResponse } from 'src/app/shared/models/restResponse';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-confirme-phone',
  templateUrl: './confirme-phone.component.html',
  styleUrls: ['./confirme-phone.component.scss']
})
export class ConfirmePhoneComponent implements OnInit {

  cgu: boolean = false;
  confirmphoneForm: FormGroup;
  formErrors: any;
  phone:string;
  isMailLoading:boolean=false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public FormBuilder: FormBuilder,
    private authService : AuthService
  ) {
    this.formErrors ={
      code:{}
    };

   }

  ngOnInit(): void {

    this.confirmphoneForm = new FormGroup({
      code: new FormControl('', Validators.minLength(4))
    });
    this.phone = this.route.snapshot.paramMap.get('phone');
  }

  onCode():void{

    this.isMailLoading = true;
    this.authService.validCode({code:this.confirmphoneForm.get('code').value, phone:this.phone}).then(res=>{
      let response = <restResponse>res;
      console.log(response);
      if(!response.success){
        this.formErrors['code'].notfound=true;
        this.isMailLoading = false;
      }else{
        this.isMailLoading = false;
        this.router.navigate(['login']);
      }
    }).catch(err => {
      console.log("Error", err);
    });
  }

}
