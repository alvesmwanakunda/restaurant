import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FidelitesComponent } from '../fidelites.component';


@Component({
  selector: 'app-delete-cadeau',
  templateUrl: './delete-cadeau.component.html',
  styleUrls: ['./delete-cadeau.component.scss']
})
export class DeleteCadeauComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FidelitesComponent>,
  ) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close(false);
  }

  onCloseDelete(){
    this.dialogRef.close(true);
  }

}
