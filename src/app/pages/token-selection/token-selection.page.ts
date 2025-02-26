import { Component } from "@angular/core";
import { BagService } from "../../bag.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-token-selection",
  templateUrl: "./token-selection.page.html",
  styleUrls: ["./token-selection.page.scss"],
  imports: [CommonModule, FormsModule, IonicModule],
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
