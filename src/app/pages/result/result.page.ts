import { Component } from "@angular/core";
import { BagService } from "../../bag.service";
import { Router } from "@angular/router";
import { Tokencolor } from "../../tokencolor.enum";
import { Plugins } from "@capacitor/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
const { Share } = Plugins;

@Component({
    selector: "app-result",
    templateUrl: "./result.page.html",
    styleUrls: ["./result.page.scss"],
    imports: [CommonModule, FormsModule, IonicModule]
})
export class ResultPage {
  Tokencolor = Tokencolor;

  constructor(
    public bag: BagService,
    private router: Router,
  ) {}

  ShareResult() {
    let tokens = [];
    this.bag.Tokens.forEach((t) => {
      if (t.Color == Tokencolor.Black) tokens.push(0);
      else tokens.push(1);
    });
    let extracted = [];
    this.bag.ExtractedToken.forEach((t) => {
      if (t.Color == Tokencolor.Black) extracted.push(0);
      else extracted.push(1);
    });
    let risk = [];
    this.bag.RiskExtractedToken.forEach((t) => {
      if (t.Color == Tokencolor.Black) risk.push(0);
      else risk.push(1);
    });
    Share.share({
      title: "Token Estratti",
      text: "",
      url:
        "https://not-the-end.web.app/bag/share-result?t=" +
        this.toHexString(tokens) +
        "&e=" +
        this.toHexString(extracted) +
        "&r=" +
        this.toHexString(risk),
      dialogTitle: "Token Estratti",
    });
  }

  Risk() {
    this.bag.extractRiskTokens();
  }

  End() {
    this.router
      .navigate(["/bag", "home"], { queryParams: { refresh: true } })
      .then(() => {
        this.bag.cleanBag();
      });
  }

  doRefresh(event) {
    this.router
      .navigate(["/bag", "home"], { queryParams: { refresh: true } })
      .then(() => {
        this.bag.cleanBag();
        event.target.complete();
      });
  }

  revealTokens() {
    this.bag.revealRemains = true;
  }

  get BlackRemain() {
    return this.bag.Tokens.filter((t) => t.Color == Tokencolor.Black).length;
  }

  get WhiteRemain() {
    return this.bag.Tokens.filter((t) => t.Color == Tokencolor.White).length;
  }

  toHexString(byteArray) {
    return Array.prototype.map
      .call(byteArray, function (byte) {
        return ("0" + (byte & 0xff).toString(16)).slice(-2);
      })
      .join("");
  }
  toByteArray(hexString) {
    var result = [];
    for (var i = 0; i < hexString.length; i += 2) {
      result.push(parseInt(hexString.substr(i, 2), 16));
    }
    return result;
  }
}
