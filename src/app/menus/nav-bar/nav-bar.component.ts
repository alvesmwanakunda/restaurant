import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-nav-layout'}
})
export class NavBarComponent implements OnInit {

  isMenuSize = false;

  constructor() { }

  ngOnInit(): void {
  }

}
