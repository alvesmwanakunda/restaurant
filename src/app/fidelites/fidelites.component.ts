import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadeauComponent } from './cadeau/cadeau.component';
import { ReductionComponent } from './reduction/reduction.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { AddCadeauComponent } from './add-cadeau/add-cadeau.component';
import { AddReductionComponent } from './add-reduction/add-reduction.component';
import { AddLivraisonComponent } from './add-livraison/add-livraison.component';
import { CadeauService } from '../shared/services/cadeau.service';
import { EntrepriseService } from '../shared/services/entreprise.service';
import { UpdateCadeauComponent } from './update-cadeau/update-cadeau.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReductionService } from '../shared/services/reduction.service';
import { UpdateReductionComponent } from './update-reduction/update-reduction.component';
import { LivraisonService } from '../shared/services/livraison.service';
import { UpdateLivraisonComponent } from './update-livraison/update-livraison.component';
import { AddVisiteComponent } from './add-visite/add-visite.component';
import { VisiteService } from '../shared/services/visite.service';
import { UpdateVisiteComponent } from './update-visite/update-visite.component';
import { BudgetService } from '../shared/services/budget.service';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { UpdateBudgetComponent } from './update-budget/update-budget.component';


@Component({
  selector: 'app-fidelites',
  templateUrl: './fidelites.component.html',
  styleUrls: ['./fidelites.component.scss']
})
export class FidelitesComponent implements OnInit {

  entreprise:any;
  listCadeau:any;
  listReduction:any;
  listLivraison:any;
  listVisite:any;
  listBudget:any;

  constructor(
    public dialog:MatDialog, 
    private cadeauService:CadeauService,
    private entrepriseService:EntrepriseService,
    private _snackBar: MatSnackBar,
    private reductionService: ReductionService,
    private livraisonService: LivraisonService,
    private visiteService: VisiteService,
    private budgetService: BudgetService) { }

  ngOnInit(): void {

    this.getEntreprise();
  }
   //width:'30%',height:'30%'
  openDialogCadeau(){
    const dialogRef = this.dialog.open(CadeauComponent,{width:'50%',height:'50%'});
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
    const dialogRef = this.dialog.open(AddCadeauComponent,{width:'53%',height:'50%'});
    dialogRef.afterClosed().subscribe(result => {
      this.getCadeau(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogUpdateCadeau(idCadeau){
    const dialogRef = this.dialog.open(UpdateCadeauComponent,{width:'53%',height:'50%',data:{id:idCadeau}});
    dialogRef.afterClosed().subscribe(result => {
      this.getCadeau(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

   openDialogAddReduction(){
    const dialogRef = this.dialog.open(AddReductionComponent,{width:'55%',height:'50%'});
    dialogRef.afterClosed().subscribe(result => {
      this.getReduction(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }
  openDialogUpdateReduction(idReduction){
    const dialogRef = this.dialog.open(UpdateReductionComponent,{width:'55%',height:'50%',data:{id:idReduction}});
    dialogRef.afterClosed().subscribe(result => {
      this.getReduction(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }


   openDialogAddLivraison(){
    const dialogRef = this.dialog.open(AddLivraisonComponent,{width:'53%',height:'50%'});
    dialogRef.afterClosed().subscribe(result => {
      this.getLivraison(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogUpdateLivraison(idLivraison){
    const dialogRef = this.dialog.open(UpdateLivraisonComponent,{width:'53%',height:'50%',data:{id:idLivraison}});
    dialogRef.afterClosed().subscribe(result => {
      this.getLivraison(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogAddVisite(){
    const dialogRef = this.dialog.open(AddVisiteComponent,{width:'53%',height:'50%'});
    dialogRef.afterClosed().subscribe(result => {
      this.getVisite(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogUpdateVisite(idVisite){
    const dialogRef = this.dialog.open(UpdateVisiteComponent,{width:'53%',height:'50%',data:{id:idVisite}});
    dialogRef.afterClosed().subscribe(result => {
      this.getVisite(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogAddBudget(){
    const dialogRef = this.dialog.open(AddBudgetComponent,{width:'53%',height:'45%'});
    dialogRef.afterClosed().subscribe(result => {
      this.getBudget(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogUpdadeBudget(idBudget){
    const dialogRef = this.dialog.open(UpdateBudgetComponent,{width:'53%',height:'50%',data:{id:idBudget}});
    dialogRef.afterClosed().subscribe(result => {
      this.getBudget(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
           this.entreprise = res.body;
           if(this.entreprise){
             this.getCadeau(this.entreprise._id);
             this.getReduction(this.entreprise._id);
             this.getLivraison(this.entreprise._id);
             this.getVisite(this.entreprise._id);
             this.getBudget(this.entreprise._id);
           }
          
      } catch (error) {
        console.log("Erreur ", error);
      }
    })
  }

  getCadeau(idEntreprise){

    this.cadeauService.listCadeauEntreprise(idEntreprise).subscribe((res:any)=>{
      try {
            //console.log("Cadeau", res);
            this.listCadeau = res.message;

      } catch (error) {
        console.log("Error", error);
      }
    })
  }

  deleteCadeau(idCadeau){
    this.cadeauService.removeCadeau(idCadeau).subscribe((res:any)=>{
      try {
        this.getCadeau(this.entreprise._id);
        this.openSnackBarCadeau();
        //console.log("Delete", res);
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  getReduction(idEntreprise){
    this.reductionService.listReductionEntreprise(idEntreprise).subscribe((res:any)=>{
      try {
         this.listReduction = res.message;
      } catch (error) {
        console.log("Error", error);
      }
    })
  }

  deleteReduction(idReduction){
    this.reductionService.removeReduction(idReduction).subscribe((res:any)=>{
      try {
        this.getReduction(this.entreprise._id);
        this.openSnackBarReduction();
      } catch (error) {
        console.log("Error", error);
      }
    })
  }

  getLivraison(idEntreprise){
    this.livraisonService.listLivraisonEntreprise(idEntreprise).subscribe((res:any)=>{
      try {
         this.listLivraison = res.message;
      } catch (error) {
        console.log("Error", error);
      }
    })
  }

  deleteLivraison(idLivraison){

    console.log("Livraison", idLivraison);
    this.livraisonService.removeLivraison(idLivraison).subscribe((res:any)=>{
      try {
        this.getLivraison(this.entreprise._id);
        this.openSnackBarLivraison();
      } catch (error) {
        console.log("Error", error);
      }
    })
  }

  getVisite(idEntreprise){

    this.visiteService.listVisiteEntreprise(idEntreprise).subscribe((res:any)=>{
      try {
         this.listVisite = res.message;
      } catch (error) {
        console.log("Error", error);
      }
    })

  }

  deleteVisite(idVisite){

    console.log("Visite", idVisite);
    this.visiteService.removeVisite(idVisite).subscribe((res:any)=>{
      try {
        this.getVisite(this.entreprise._id);
        this.openSnackBarVisite();
      } catch (error) {
        console.log("Error", error);
      }
    })
  }

  getBudget(idEntreprise){

    this.budgetService.listBudgetEntreprise(idEntreprise).subscribe((res:any)=>{
      try {
         this.listBudget = res.message;
      } catch (error) {
        console.log("Error", error);
      }
    })

  }

  deleteBudget(idBudget){

    this.budgetService.removeBudget(idBudget).subscribe((res:any)=>{
      try {
        this.getBudget(this.entreprise._id);
        this.openSnackBarBudget();
      } catch (error) {
        console.log("Error", error);
      }
    })
  }

  openSnackBarCadeau() {
    this._snackBar.open('Cadeau supprimer avec succès', 'Fermer', {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }

  openSnackBarReduction() {
    this._snackBar.open('Reduction supprimer avec succès', 'Fermer', {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }

  openSnackBarLivraison() {
    this._snackBar.open('Livraison supprimer avec succès', 'Fermer', {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }

  openSnackBarVisite() {
    this._snackBar.open('points visites supprimer avec succès', 'Fermer', {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }

  openSnackBarBudget() {
    this._snackBar.open('budget dépensé supprimer avec succès', 'Fermer', {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }


}
