import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Plugins, StatusBarStyle } from '@capacitor/core';
import { PopoverController } from '@ionic/angular';
import { InfoComponent } from './info/info.component';
const { SplashScreen, StatusBar, App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private router : Router,
    private popover : PopoverController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    StatusBar.setStyle({
      style: StatusBarStyle.Dark
    });
    SplashScreen.hide();
    App.addListener('backButton', () => {
      if(this.router.url=="/"||this.router.url.includes("/home"))App.exitApp();
      else this.router.navigate(['/home'],{ queryParams: { refresh: true } });
    });
  }

  async loadinfo(){
    let pop=this.popover.create({
      component:InfoComponent,
      backdropDismiss:true,
      showBackdrop:true,
      cssClass:"info-pop"
    });
    (await pop).present();
  }
}
