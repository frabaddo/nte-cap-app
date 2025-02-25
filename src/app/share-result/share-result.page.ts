import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Tokencolor } from "../tokencolor.enum";
import { Bag } from "../bag";
import { first } from "rxjs/operators";
import { Token } from "../token";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-share-result",
  templateUrl: "./share-result.page.html",
  styleUrls: ["./share-result.page.scss"],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ShareResultPage implements OnInit {
  Tokencolor = Tokencolor;
  bag: Bag;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.pipe(first()).subscribe((params) => {
      console.log(params);
      this.bag = new Bag({
        Tokens: this.toByteArray(params.t).map((t) =>
          t == 0 ? new Token(Tokencolor.Black) : new Token(Tokencolor.White)
        ),
        ExtractedToken: this.toByteArray(params.e).map((t) =>
          t == 0 ? new Token(Tokencolor.Black) : new Token(Tokencolor.White)
        ),
        RiskExtractedToken: this.toByteArray(params.r).map((t) =>
          t == 0 ? new Token(Tokencolor.Black) : new Token(Tokencolor.White)
        ),
      });
    });
  }

  Risk() {
    this.bag.extractRiskTokens();
  }

  End() {
    this.router.navigate(["/home"], { queryParams: { refresh: true } });
  }

  doRefresh(event) {
    this.router
      .navigate(["/home"], { queryParams: { refresh: true } })
      .then(() => {
        event.target.complete();
      });
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
