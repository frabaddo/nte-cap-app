import { Component } from "@angular/core";
import { IonTabBar, IonTabButton, IonTabs } from "@ionic/angular/standalone";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
  imports: [IonTabs, IonTabBar, IonTabButton],
})
export class TabsComponent {}
