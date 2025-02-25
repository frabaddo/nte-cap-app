import { Component, OnInit } from "@angular/core";
import { BagService } from "../bag.service";
import { Router, ActivatedRoute } from "@angular/router";
import { trigger, style, animate, transition } from "@angular/animations";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
    animations: [
        trigger("enter", [
            transition(":enter", [
                style({ opacity: 0, transform: "scale(0)" }),
                animate("250ms", style({ opacity: 1, transform: "scale(1)" })),
            ]),
            transition(":leave", [
                animate("250ms", style({ opacity: 0, transform: "scale(0)" })),
            ]),
        ]),
    ],
    standalone: false
})
export class HomePage implements OnInit {
  whiteToExtract = 1;

  blackToExtract = 1;

  confusionToExtract = 0;

  confusion = false;

  adrenalin = false;

  constructor(
    public bag: BagService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.refresh) {
        this.blackToExtract = 1;
        this.whiteToExtract = 1;
        this.confusionToExtract = 0;
        this.confusion = false;
        this.adrenalin = false;
      } else if (params.share) {
        this.router.navigate(["/share-result"], {
          queryParams: {
            tokens: params.tokens,
            extracted: params.extracted,
            risk: params.risk,
          },
        });
      }
    });
  }

  ionViewWillEnter() {
    this.bag.cleanBag();
  }

  preparebag() {
    if (
      ((this.confusion &&
        (this.whiteToExtract > 0 || this.confusionToExtract > 0)) ||
        this.whiteToExtract > 0) &&
      this.blackToExtract > 0
    ) {
      this.bag.insertTokens(
        this.whiteToExtract,
        this.blackToExtract,
        this.confusionToExtract,
        this.confusion,
      );
      if (this.adrenalin) {
        this.bag.extractTokens(4);
        this.router.navigate(["/result"]);
      } else this.router.navigate(["/token-selection"]);
    }
  }

  increment(type) {
    if (type == 0) this.whiteToExtract++;
    else if (type == 1) this.blackToExtract++;
    else if (type == 2) this.confusionToExtract++;
  }

  decrement(type) {
    if (type == 0 && this.whiteToExtract > 0) this.whiteToExtract--;
    else if (type == 1 && this.blackToExtract > 0) this.blackToExtract--;
    else if (type == 2 && this.confusionToExtract > 0)
      this.confusionToExtract--;
  }

  doRefresh(event) {
    this.bag.cleanBag();
    this.blackToExtract = 1;
    this.whiteToExtract = 1;
    this.confusion = false;
    this.adrenalin = false;
    event.target.complete();
  }
}
