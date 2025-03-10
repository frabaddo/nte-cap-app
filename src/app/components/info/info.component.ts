import { Component } from "@angular/core";
import {
  IonButton,
  IonCol,
  IonContent,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  PopoverController,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
  imports: [
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonText,
    IonImg,
    IonIcon,
  ],
})
export class InfoComponent {
  constructor(private popover: PopoverController) {}

  close() {
    this.popover.dismiss();
  }
}
