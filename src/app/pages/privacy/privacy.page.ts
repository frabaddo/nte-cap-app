import { Component } from "@angular/core";
import {
  IonButton,
  IonCol,
  IonContent,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-privacy",
  templateUrl: "./privacy.page.html",
  styleUrls: ["./privacy.page.scss"],
  imports: [
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class PrivacyPage {
  constructor() {}
}
