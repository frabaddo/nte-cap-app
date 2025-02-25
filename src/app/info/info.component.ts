import { Component } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component({
    selector: "app-info",
    templateUrl: "./info.component.html",
    styleUrls: ["./info.component.scss"],
    standalone: false
})
export class InfoComponent {
  constructor(private popover: PopoverController) {}

  close() {
    this.popover.dismiss();
  }
}
