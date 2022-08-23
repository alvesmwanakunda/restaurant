import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {
    path:"",
    redirectTo:"/login",
    pathMatch:"full",
  },
  {
    path:"login",
    loadChildren:()=>import('./login/login.module').then(m => m.LoginModule),
    data:{preload:true}
  },
  {
    path:"signup",
    loadChildren:()=>import('./signup/signup.module').then(m => m.SignupModule),
  },
  {
    path:"reset",
    loadChildren:()=>import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule),
  },
  {
    path:"dashboard",
    loadChildren:()=>import('./dashboard/dashboard.module').then(m=> m.DashboardModule),
  },
  {
    path:"clients",
    loadChildren:()=>import('./clients/clients.module').then(m=> m.ClientsModule),
  },
  {
    path:"historiques",
    loadChildren:()=>import('./historique/historique.module').then(m=>m.HistoriqueModule),
  },
  {
    path:"promotions",
    loadChildren:()=>import('./promotions/promotions.module').then(m=>m.PromotionsModule),
  },
  {
    path:"add/promotion",
    loadChildren:()=>import('./promotions/add-promotion/add-promotion.module').then(m=>m.AddPromotionModule),
  },
  {
    path:"parametres",
    loadChildren:()=>import('./parametres/parametres.module').then(m=>m.ParametresModule),
  },
 /* {
    path:"add/personnel",
    loadChildren:()=>import('./parametres/add-personnel/add-personnel.module').then(m=>m.AddPersonnelModule),
  },*/
  {
    path:"fidelites",
    loadChildren:()=>import('./fidelites/fidelites.module').then(m=>m.FidelitesModule),
  },
  {
     path:"message/client",
     loadChildren:()=>import('./promotions/message-client/message-client.module').then(m=>m.MessageClientModule),
  },
  {
    path:"confirme/:email",
    loadChildren:()=>import('./signup/confirme/confirme.module').then(m=>m.ConfirmeModule),
  },
  {
    path:"confirmephone/:phone",
    loadChildren:()=>import('./signup/confirme-phone/confirme-phone.module').then(m=>m.ConfirmePhoneModule),
  },
  {
    path:"reset-password",
    loadChildren:()=>import('./new-password/new-password.module').then(m=>m.NewPasswordModule),
  },
  {
    path:"validation/compte",
    loadChildren:()=>import('./signup/confirme-email/confirme-email.module').then(m=>m.ConfirmeEmailModule),
  },
  {
    path:"shared/client/:idEntreprise",
    loadChildren:()=>import('./link-entreprise/link-entreprise.module').then(m=>m.LinkEntrepriseModule)
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes,{
      preloadingStrategy:PreloadAllModules,
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private routee:Router){
    this.routee.errorHandler = (error:any)=>{
      console.log("Erreur avec la route.", error);
    }
  }
}
