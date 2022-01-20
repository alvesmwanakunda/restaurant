import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-detail-promotion',
  templateUrl: './detail-promotion.component.html',
  styleUrls: ['./detail-promotion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-detail-promotion'}
})
export class DetailPromotionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
