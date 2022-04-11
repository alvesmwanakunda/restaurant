import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderBarModule } from '../header-bar/header-bar.module';
import { RouterModule } from '@angular/router';
import {CookieService} from 'ngx-cookie-service'

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    SharedModule,
    HeaderBarModule,
    RouterModule
  ],
  exports:[NavBarComponent],
  providers:[CookieService]
})
export class NavBarModule { }
