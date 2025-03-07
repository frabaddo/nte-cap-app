import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Plugins, StatusBarStyle } from "@capacitor/core";
import { PopoverController } from "@ionic/angular";
import { InfoComponent } from "./components/info/info.component";
const { SplashScreen, StatusBar, App } = Plugins;

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
    standalone: false
})
export class AppComponent {
  constructor(
    private router: Router,
    private popover: PopoverController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    }).catch((err) => console.log);
    SplashScreen.hide().catch((err) => console.log);
    App.addListener("backButton", () => {
      if (this.router.url == "/" || this.router.url.includes("/home"))
        App.exitApp();
      else this.router.navigate(["/bag", "home"], { queryParams: { refresh: true } });
    });
  }

  async loadinfo() {
    let pop = this.popover.create({
      component: InfoComponent,
      backdropDismiss: true,
      showBackdrop: true,
      cssClass: "info-pop",
    });
    (await pop).present();
  }
}
