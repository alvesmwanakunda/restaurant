import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageClientRoutingModule } from './message-client-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageClientComponent } from './message-client.component';
import { NavBarModule } from 'src/app/menus/nav-bar/nav-bar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Types } from 'src/app/shared/class/types';
import { VisiteMessageModule } from './visite-message/visite-message.module';
import { AnniversaireMessageModule } from './anniversaire-message/anniversaire-message.module';
import { RelancerMessageModule } from './relancer-message/relancer-message.module';
import { MessageService } from 'src/app/shared/services/message.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { TestMessageModule } from './test-message/test-message.module';
import { DeleteMessageModule } from './delete-message/delete-message.module';




@NgModule({
  declarations: [MessageClientComponent],
  imports: [
    CommonModule,
    MessageClientRoutingModule,
    SharedModule,
    NavBarModule,
    NgbModule,
    VisiteMessageModule,
    AnniversaireMessageModule,
    RelancerMessageModule,
    TestMessageModule,
    DeleteMessageModule
  ],
  providers:[Types,MessageService,EntrepriseService]
})
export class MessageClientModule { }
