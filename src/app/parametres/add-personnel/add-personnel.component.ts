import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-add-personnel'}
})
export class AddPersonnelComponent implements OnInit {
  hide = true;
  hideC = true;

  constructor() { }

  ngOnInit(): void {
  }

}
