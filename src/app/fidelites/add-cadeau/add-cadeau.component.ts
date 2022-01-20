import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-cadeau',
  templateUrl: './add-cadeau.component.html',
  styleUrls: ['./add-cadeau.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-add-cadeau'}
})
export class AddCadeauComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
