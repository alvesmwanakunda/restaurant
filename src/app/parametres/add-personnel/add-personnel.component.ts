import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.scss']
})
export class AddPersonnelComponent implements OnInit {
  hide = true;
  hideC = true;

  constructor() { }

  ngOnInit(): void {
  }

}
