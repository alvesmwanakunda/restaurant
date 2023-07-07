import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-nav-layout'}
})
export class NavBarComponent implements OnInit {

  isMenuSize:any;
  isPromotion:any;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {

    this.isMenuSize = !!this.cookieService.get('isMenuSize');
    this.isPromotion = !!this.cookieService.get('isPromotion');
  }

  openMenu(){
    if(this.isMenuSize){
      this.isMenuSize=false;
      this.cookieService.delete('isMenuSize');
    }else{
      this.isMenuSize=true;
      this.cookieService.set('isMenuSize',this.isMenuSize);
    }
  }

  openPromotion(){
    if(this.isPromotion){
       this.isPromotion=false;
       this.cookieService.delete('isPromotion');
    }else{
        this.isPromotion=true;
        this.cookieService.set('isPromotion',this.isPromotion);
    }
  }

}
