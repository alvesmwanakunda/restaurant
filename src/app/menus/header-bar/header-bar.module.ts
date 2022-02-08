import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './header-bar.component';
import { AuthService } from 'src/app/shared/services/auth.service';



@NgModule({
  declarations: [HeaderBarComponent],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderBarComponent
  ],
  providers:[AuthService]
})
export class HeaderBarModule { }
