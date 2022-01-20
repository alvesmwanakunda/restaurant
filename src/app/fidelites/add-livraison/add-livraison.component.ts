import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-livraison',
  templateUrl: './add-livraison.component.html',
  styleUrls: ['./add-livraison.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-add-livraison'}
})
export class AddLivraisonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
