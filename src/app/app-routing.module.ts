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
