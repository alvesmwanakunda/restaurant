import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'prix', 'cible'];
  dataSource = ELEMENT_DATA;

  constructor(private clientService:ClientService) { }

  ngOnInit(): void {

    //this.clientService.getInfo();
  }

}

export interface PeriodicElement {
  name: string;
  date: string;
  prix: number;
  cible: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '07 Avril 2021', name: 'Promotion Air max', prix: 1.0079, cible: 56000},
  {date: '07 Avril 2021', name: 'Promotion Air max', prix: 1.0079, cible: 56000},
  {date: '07 Avril 2021', name: 'Promotion Air max', prix: 1.0079, cible: 56000},
  {date: '07 Avril 2021', name: 'Promotion Air max', prix: 1.0079, cible: 56000},
  {date: '07 Avril 2021', name: 'Promotion Air max', prix: 1.0079, cible: 56000},
];
