import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from 'src/app/login/login.component';
import {MatDialogRef} from '@angular/material/dialog';



@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.scss']
})
export class DeconnexionComponent implements OnInit {

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<LoginComponent>,) { }

  ngOnInit(): void {
  }

  logout():void{
    this.authService.logout();
    this.dialogRef.close();
  }

}
