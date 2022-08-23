import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkEntrepriseRoutingModule } from './link-entreprise-routing.module';
import { LinkEntrepriseComponent } from './link-entreprise.component';
import { SharedModule } from '../shared/shared.module';
import { EntrepriseService } from '../shared/services/entreprise.service';
import { ClientService } from '../shared/services/client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [LinkEntrepriseComponent],
  imports: [
    CommonModule,
    LinkEntrepriseRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[EntrepriseService,ClientService]
})
export class LinkEntrepriseModule { }
