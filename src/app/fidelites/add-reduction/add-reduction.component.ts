import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-reduction',
  templateUrl: './add-reduction.component.html',
  styleUrls: ['./add-reduction.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-add-reduction'}
})
export class AddReductionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
