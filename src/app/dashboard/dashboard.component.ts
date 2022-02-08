import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private clientService:ClientService) { }

  ngOnInit(): void {

    //this.clientService.getInfo();
  }

}
