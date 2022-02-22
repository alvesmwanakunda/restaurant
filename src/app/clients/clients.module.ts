import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { SharedModule } from '../shared/shared.module';
import { NavBarModule } from '../menus/nav-bar/nav-bar.module';
import { AddClientModule } from './add-client/add-client.module';
import { DetailClientModule } from './detail-client/detail-client.module';
import { ClientService } from '../shared/services/client.service';
import { EntrepriseService } from '../shared/services/entreprise.service';
import { UploadClientModule } from './upload-client/upload-client.module';


@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    NavBarModule,
    AddClientModule,
    DetailClientModule,
    UploadClientModule
  ],
  providers:[ClientService, EntrepriseService]
})
export class ClientsModule { }
