import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageClientRoutingModule } from './message-client-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageClientComponent } from './message-client.component';
import { NavBarModule } from 'src/app/menus/nav-bar/nav-bar.module';


@NgModule({
  declarations: [MessageClientComponent],
  imports: [
    CommonModule,
    MessageClientRoutingModule,
    SharedModule,
    NavBarModule
  ]
})
export class MessageClientModule { }
