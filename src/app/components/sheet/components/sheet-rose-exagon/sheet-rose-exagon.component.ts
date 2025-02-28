import { CommonModule } from "@angular/common";
import { Component, input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-sheet-rose-exagon",
  templateUrl: "./sheet-rose-exagon.component.html",
  styleUrls: ["./sheet-rose-exagon.component.scss"],
  imports: [CommonModule, FormsModule, IonicModule],
  host: { "[class.active]": "isOpen()" },
})
export class SheetRoseExagonComponent {
  isOpen = input<boolean>(false);
  icon = input<string | undefined>(undefined);
  text = input<string | undefined>(undefined);
}
