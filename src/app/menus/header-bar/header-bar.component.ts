import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-header-bar'}
})
export class HeaderBarComponent implements OnInit {

  user:any;

  constructor(private authService: AuthService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log("User", this.user.user);
  }

  ngOnInit(): void {
  }

  logout():void{
    this.authService.logout()
  }

}
