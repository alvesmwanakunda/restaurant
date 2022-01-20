import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametresComponent } from './parametres.component';
import { ParametresRoutingModule } from './parametres-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavBarModule } from '../menus/nav-bar/nav-bar.module';


@NgModule({
  declarations: [ParametresComponent],
  imports: [
    CommonModule,
    ParametresRoutingModule,
    SharedModule,
    NavBarModule
  ]
})
export class ParametresModule { }
