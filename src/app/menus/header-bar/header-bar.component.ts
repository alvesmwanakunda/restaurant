import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeconnexionComponent } from '../deconnexion/deconnexion.component';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-header-bar'}
})
export class HeaderBarComponent implements OnInit {

  user:any;
  entreprise:any;

  constructor(private authService: AuthService,public dialog:MatDialog,private entrepriseService:EntrepriseService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("User", this.user);
  }

  ngOnInit(): void {
    this.getEntreprise();
  }

  logout():void{
    this.authService.logout()
  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
          this.entreprise = res.body;
          console.log("Entreprise", this.entreprise);
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  openDialog(){
    const dialogRef = this.dialog.open(DeconnexionComponent,{width:'20%'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

    })
  }

}
