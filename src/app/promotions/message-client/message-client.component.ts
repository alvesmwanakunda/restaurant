import { Component, OnInit } from '@angular/core';
import { Types } from 'src/app/shared/class/types';

@Component({
  selector: 'app-message-client',
  templateUrl: './message-client.component.html',
  styleUrls: ['./message-client.component.scss']
})
export class MessageClientComponent implements OnInit {

  listTypes:any;

  constructor(
    public types: Types,
  ) { }

  ngOnInit(): void {

    this.listTypes = this.types.listTypes;
  }

}
