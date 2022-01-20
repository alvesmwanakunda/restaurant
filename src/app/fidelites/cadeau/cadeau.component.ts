import { Component, OnInit,ViewChild,ViewEncapsulation,AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-cadeau',
  templateUrl: './cadeau.component.html',
  styleUrls: ['./cadeau.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-cadeau'}
})
export class CadeauComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['nom', 'numero', 'date', 'cadeaux','points'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  nom: string;
  numero: string;
  date: string;
  cadeaux: number;
  points: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nom: "Henri", numero: 'KEY-2891-896J-905H', date:'12/02/21', cadeaux: 1, points:2},
  {nom: "Willis", numero: 'KEY-2891-896J-905H', date:'12/02/21', cadeaux: 1, points:2},
  {nom: "Jacob", numero: 'KEY-2891-896J-905H', date:'12/02/21', cadeaux: 1, points:2},
  {nom: "Aziz", numero: 'KEY-2891-896J-905H', date:'12/02/21', cadeaux: 1, points:2},
  {nom: "Lorenza", numero: 'KEY-2891-896J-905H', date:'12/02/21', cadeaux: 1, points:2},
  {nom: "Thierry", numero: 'KEY-2891-896J-905H', date:'12/02/21', cadeaux: 1, points:2},
  {nom: "Khadija", numero: 'KEY-2891-896J-905H', date:'12/02/21', cadeaux: 1, points:2},
  {nom: "Tackos", numero: 'KEY-2891-896J-905H', date:'12/02/21', cadeaux: 1, points:2},
  {nom: "Tackos", numero: 'KEY-2891-896J-905H', date:'12/02/21', cadeaux: 1, points:2},
  {nom: "Tackos", numero: 'KEY-2891-896J-905H', date:'12/02/21', cadeaux: 1, points:2},
  {nom: "Tackos", numero: 'KEY-2891-896J-905H', date:'12/02/21', cadeaux: 1, points:2},
];
