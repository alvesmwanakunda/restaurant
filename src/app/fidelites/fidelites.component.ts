import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadeauComponent } from './cadeau/cadeau.component';
import { ReductionComponent } from './reduction/reduction.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { AddCadeauComponent } from './add-cadeau/add-cadeau.component';
import { AddReductionComponent } from './add-reduction/add-reduction.component';
import { AddLivraisonComponent } from './add-livraison/add-livraison.component';

@Component({
  selector: 'app-fidelites',
  templateUrl: './fidelites.component.html',
  styleUrls: ['./fidelites.component.scss']
})
export class FidelitesComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openDialogCadeau(){
    const dialogRef = this.dialog.open(CadeauComponent,{width:'150%'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogReduction(){
    const dialogRef = this.dialog.open(ReductionComponent,{width:'150%'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogLivraison(){
    const dialogRef = this.dialog.open(LivraisonComponent,{width:'150%'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogAddCadeau(){
    const dialogRef = this.dialog.open(AddCadeauComponent,{width:'70%',height:'50%'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

   openDialogAddReduction(){
    const dialogRef = this.dialog.open(AddReductionComponent,{width:'70%',height:'50%'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

   openDialogAddLivraison(){
    const dialogRef = this.dialog.open(AddLivraisonComponent,{width:'70%',height:'50%'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }


}
