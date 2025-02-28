import { Component, OnInit, signal } from "@angular/core";
import { SheetRoseExagonComponent } from "./components/sheet-rose-exagon/sheet-rose-exagon.component";

@Component({
  selector: "app-sheet-rose",
  templateUrl: "./sheet-rose.component.html",
  styleUrls: ["./sheet-rose.component.scss"],
  imports: [SheetRoseExagonComponent],
})
export class SheetRoseComponent {
  sheet = signal([
    new Array(1).fill(1),
    new Array(2).fill(1),
    new Array(3).fill(1),
    new Array(2).fill(1),
    new Array(3).fill(1),
    new Array(2).fill(1),
    new Array(3).fill(1),
    new Array(2).fill(1),
    new Array(1).fill(1),
  ]);
}
