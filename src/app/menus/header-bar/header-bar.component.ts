import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeconnexionComponent } from '../deconnexion/deconnexion.component';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-header-bar'}
})
export class HeaderBarComponent implements OnInit {

  user:any;

  constructor(private authService: AuthService,public dialog:MatDialog) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("User", this.user.user);
  }

  ngOnInit(): void {
  }

  logout():void{
    this.authService.logout()
  }

  openDialog(){
    const dialogRef = this.dialog.open(DeconnexionComponent,{width:'20%'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

    })
  }

}
