import { Component, input, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-sheet-rose-exagon",
  templateUrl: "./sheet-rose-exagon.component.html",
  styleUrls: ["./sheet-rose-exagon.component.scss"],
  imports: [IonicModule],
  host: { "[class.active]": "isOpen()" },
})
export class SheetRoseExagonComponent {
  isOpen = input<boolean>(false);
  image = input<string | undefined>(undefined);
  text = input<string | undefined>(undefined);
}
