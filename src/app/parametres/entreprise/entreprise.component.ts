import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { EntrepriseInterface } from 'src/app/shared/interfaces/entreprises.interface';
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host:{class:'app-entreprise'}
})
export class EntrepriseComponent implements OnInit {

  constructor(private entrepriseService:EntrepriseService, private sanitizer: DomSanitizer,private _snackBar: MatSnackBar) {

  }

  entreprise:EntrepriseInterface;
  entrepriseForm: FormGroup;
  idEntreprise:any;
  fileName="";
  image:any;
  onLoadForm: boolean = false;
  isUpdate:boolean = false;


  ngOnInit(): void {

    this.getEntreprise();

  }

  getEntreprise(){
    this.entrepriseService.getEntrepriseByUser().subscribe((res:any)=>{
      try {
           this.entreprise = res.body
           if(this.entreprise){
            this.entrepriseForm = new FormGroup({
              nom: new FormControl(this.entreprise.nom,[
                Validators.required
              ]),
              adresse:new FormControl(this.entreprise.adresse,[
                Validators.required
              ])
            })
           }
           this.idEntreprise = res.body._id;
           this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res.body.image}`);
           //console.log("Entreprise", this.entreprise);
           //console.log("Image", this.image);
      } catch (error) {
        console.log("Erreur", error);
      }
    })
  }

  updateEntreprise(entreprise:EntrepriseInterface){
    this.onLoadForm = true;
    this.entrepriseService.updateEntreprise(entreprise,this.idEntreprise).subscribe((res:any)=>{
      try {
            this.entreprise = entreprise;
            this.onLoadForm = false;
            this.openSnackBar();
            this.isUpdate=false;
            //console.log("reponse", res);
      } catch (error) {
        console.log("Error", error);
        this.onLoadForm = false;
      }
    })
  }

  onFileSelected(event){
    const file:File = event.target.files[0];
    this.onLoadForm = true;

    if(file){
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("uploadfile", file);

      console.log("Image entreprise", formData);

      this.entrepriseService.uploadLogo(formData,this.idEntreprise).subscribe((res:any)=>{
        try {
             this.entreprise = res.message;
             this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res.message.image}`);
             this.onLoadForm = false;
        } catch (error) {
          this.onLoadForm = false;
           console.log("Erreur", error);
        }
      })
    }
  }

  openSnackBar() {
    this._snackBar.open('Information modifiée avec succès', 'Fermer', {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }

  OpenUpdate(){

    this.isUpdate = true;
  }

}
