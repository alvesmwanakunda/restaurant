import { Component } from '@angular/core';
import { ConsoleToggleService } from './shared/services/console-toggle.service';
import { NotificationService } from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wefid';

  constructor(
    private consoleToggleService: ConsoleToggleService,
    private notificationService: NotificationService
  ){
      this.consoleToggleService.disableConsoleInProduction();
      this.notificationService.getMessageAppVisite().subscribe((res:any)=>{
        console.log("Socket visite",res)
      });
      this.notificationService.getMessageDepenseCadeaux().subscribe((res:any)=>{
        console.log("Socket depense",res)
      });
      this.notificationService.getMessageVisite().subscribe((res:any)=>{
        console.log("Socket message",res)
      })
  }
}
