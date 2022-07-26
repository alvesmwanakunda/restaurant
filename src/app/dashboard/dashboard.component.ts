import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['date','name'];
  dataSource = ELEMENT_DATA;

  constructor(private clientService:ClientService) { }

  ngOnInit(): void {

    //this.clientService.getInfo();
  }

}

export interface PeriodicElement {
  name: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: 'Nombre de campagne lancée', name: '4238'},
  {date: 'Nombre de message envoyé', name: '1005'},
  {date: 'Nombre de message reçu', name: '914'},
  {date: 'Nombre de message ouvert', name: '201'},
];
