import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from 'src/app/login/login.component';
import {MatDialogRef} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.scss']
})
export class DeconnexionComponent implements OnInit {

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<LoginComponent>,private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  logout():void{
    this.cookieService.delete('rememberMe');
    this.cookieService.delete('token');
    this.deleteRemember();
    this.authService.logout();
    this.dialogRef.close();
  }

  deleteRemember(){
    this.authService.deleteVerifyToken().subscribe((res:any)=>{
      try {
          console.log("User", res);
      } catch (error) {
        console.log("Erreur",error)
      }
    })
  }


}
