import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-add-client'}
})
export class AddClientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
