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
import { DeleteCadeauComponent } from './delete-cadeau/delete-cadeau.component';
import { DeletePointComponent } from './delete-point/delete-point.component';
import { ProduitService } from '../shared/services/produit.service';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';


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
  produits:any;

  constructor(
    public dialog:MatDialog, 
    private cadeauService:CadeauService,
    private entrepriseService:EntrepriseService,
    private _snackBar: MatSnackBar,
    private reductionService: ReductionService,
    private livraisonService: LivraisonService,
    private visiteService: VisiteService,
    private budgetService: BudgetService,
    private produitService: ProduitService) { }

  ngOnInit(): void {

    this.getEntreprise();
  }
   //width:'30%',height:'30%'
  openDialogCadeau(idCadeau){
    const dialogRef = this.dialog.open(CadeauComponent,{width:'70%',height:'70%',data:{id:idCadeau}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

    })
  }

  openDialogReduction(idCadeau){
    const dialogRef = this.dialog.open(ReductionComponent,{width:'70%',data:{id:idCadeau}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogLivraison(idCadeau){
    const dialogRef = this.dialog.open(LivraisonComponent,{width:'70%',data:{id:idCadeau}});
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
    const dialogRef = this.dialog.open(AddReductionComponent,{width:'55%',height:'60%'});
    dialogRef.afterClosed().subscribe(result => {
      this.getReduction(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }
  openDialogUpdateReduction(idReduction){
    const dialogRef = this.dialog.open(UpdateReductionComponent,{width:'55%',height:'60%',data:{id:idReduction}});
    dialogRef.afterClosed().subscribe(result => {
      this.getReduction(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }


   openDialogAddLivraison(){
    const dialogRef = this.dialog.open(AddLivraisonComponent,{width:'50%',height:'40%'});
    dialogRef.afterClosed().subscribe(result => {
      this.getLivraison(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogUpdateLivraison(idLivraison){
    const dialogRef = this.dialog.open(UpdateLivraisonComponent,{width:'50%',height:'40%',data:{id:idLivraison}});
    dialogRef.afterClosed().subscribe(result => {
      this.getLivraison(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogAddVisite(){
    const dialogRef = this.dialog.open(AddVisiteComponent,{width:'50%',height:'40%'});
    dialogRef.afterClosed().subscribe(result => {
      this.getVisite(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogUpdateVisite(idVisite){
    const dialogRef = this.dialog.open(UpdateVisiteComponent,{width:'50%',height:'40%',data:{id:idVisite}});
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
             this.listProduits(this.entreprise._id);
           }
          
      } catch (error) {
        console.log("Erreur ", error);
      }
    })
  }

  getCadeau(idEntreprise){

    this.cadeauService.listCadeauEntreprise(idEntreprise,"Cadeau").subscribe((res:any)=>{
      try {
            //console.log("Cadeau", res);
            this.listCadeau = res.message;

      } catch (error) {
        console.log("Error", error);
      }
    })
  }

  deleteCadeau(idCadeau){

    const dialogRef = this.dialog.open(DeleteCadeauComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
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
      console.log(`Dialog result: ${result}`);
    })
  }

  getReduction(idEntreprise){
    this.cadeauService.listCadeauEntreprise(idEntreprise,"Reduction").subscribe((res:any)=>{
      try {
         this.listReduction = res.message;
      } catch (error) {
        console.log("Error", error);
      }
    })
  }

  deleteReduction(idReduction){

    const dialogRef = this.dialog.open(DeleteCadeauComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
        this.reductionService.removeReduction(idReduction).subscribe((res:any)=>{
          try {
            this.getReduction(this.entreprise._id);
            this.openSnackBarReduction();
          } catch (error) {
            console.log("Error", error);
          }
        })

      }
      console.log(`Dialog result: ${result}`);
    })
  }

  getLivraison(idEntreprise){
    this.cadeauService.listCadeauEntreprise(idEntreprise,"Livraison").subscribe((res:any)=>{
      try {
         this.listLivraison = res.message;
      } catch (error) {
        console.log("Error", error);
      }
    })
  }

  deleteLivraison(idLivraison){

    console.log("Livraison", idLivraison);
    const dialogRef = this.dialog.open(DeleteCadeauComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
        this.livraisonService.removeLivraison(idLivraison).subscribe((res:any)=>{
          try {
            this.getLivraison(this.entreprise._id);
            this.openSnackBarLivraison();
          } catch (error) {
            console.log("Error", error);
          }
        })
      }
      console.log(`Dialog result: ${result}`);
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

    const dialogRef = this.dialog.open(DeletePointComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
        this.visiteService.removeVisite(idVisite).subscribe((res:any)=>{
          try {
            this.getVisite(this.entreprise._id);
            this.openSnackBarVisite();
          } catch (error) {
            console.log("Error", error);
          }
        })
      }
      console.log(`Dialog result: ${result}`);
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

    const dialogRef = this.dialog.open(DeletePointComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
        this.budgetService.removeBudget(idBudget).subscribe((res:any)=>{
          try {
            this.getBudget(this.entreprise._id);
            this.openSnackBarBudget();
          } catch (error) {
            console.log("Error", error);
          }
        })
      }
      console.log(`Dialog result: ${result}`);

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

  openSnackBarProduit() {
    this._snackBar.open('produit supprimer avec succès', 'Fermer', {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }

  openSnackBarArchive() {
    this._snackBar.open('archiver avec succès', 'Fermer', {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }


  // Produits

  listProduits(idEntrepirse){
    this.produitService.listProduit(idEntrepirse).subscribe((res:any)=>{
      try {
            this.produits = res.message;
            console.log("Produits", this.produits);
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  openDialogAddProduit(){
    const dialogRef = this.dialog.open(AddProduitComponent,{width:'53%'});
    dialogRef.afterClosed().subscribe(result => {
      this.listProduits(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

  deleteProduit(idProduit){

    const dialogRef = this.dialog.open(DeletePointComponent,{data:{id:idProduit}});
    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
        this.produitService.removeProduit(idProduit).subscribe((res:any)=>{
          try {
            this.listProduits(this.entreprise._id);
            this.openSnackBarProduit();
          } catch (error) {
            console.log("Error", error);
          }
        })
      }
      console.log(`Dialog result: ${result}`);

    })
  }

  openDialogUpdadeProduit(idProduit){
    const dialogRef = this.dialog.open(UpdateProduitComponent,{width:'53%',data:{id:idProduit}});
    dialogRef.afterClosed().subscribe(result => {
      this.listProduits(this.entreprise._id);
      console.log(`Dialog result: ${result}`);
    })
  }

  ArchiveCadeau(idCadeau){
   this.cadeauService.archiveCadeau(idCadeau).subscribe((res:any)=>{
    try {
      this.openSnackBarArchive();
      this.getCadeau(this.entreprise._id);
      this.getReduction(this.entreprise._id);
      this.getLivraison(this.entreprise._id);
      this.getVisite(this.entreprise._id);
    } catch (error) {
      console.log("Erreur", error)
    }
   })
  }

 

  


}
