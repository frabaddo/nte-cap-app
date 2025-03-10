import { Component } from "@angular/core";
import { BagService } from "../../bag.service";
import { Router } from "@angular/router";
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
  selector: "app-token-selection",
  templateUrl: "./token-selection.page.html",
  styleUrls: ["./token-selection.page.scss"],
  imports: [
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonRefresher,
    IonRefresherContent,
    IonGrid,
    IonRow,
    IonCol,
    IonFabButton,
    IonButton,
  ],
})
export class TokenSelectionPage {
  tokenToExtract = 0;

  constructor(public bag: BagService, private router: Router) {}

  Extract() {
    if (this.tokenToExtract > 0) {
      this.bag.extractTokens(this.tokenToExtract);
      this.router.navigate(["/bag", "result"]);
    }
  }

  goBack() {
    this.bag.cleanBag();
    this.router.navigate(["/bag", "home"]);
  }

  doRefresh(event) {
    this.router
      .navigate(["/bag", "home"], { queryParams: { refresh: true } })
      .then(() => {
        this.bag.cleanBag();
        event.target.complete();
      });
  }
}
