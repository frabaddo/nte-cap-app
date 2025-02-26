import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, PopoverController } from "@ionic/angular";

@Component({
    selector: "app-info",
    templateUrl: "./info.component.html",
    styleUrls: ["./info.component.scss"],
    imports: [CommonModule, FormsModule, IonicModule]
})
export class InfoComponent {
  constructor(private popover: PopoverController) {}

  close() {
    this.popover.dismiss();
  }
}
