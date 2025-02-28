import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SheetRoseComponent } from "src/app/components/sheet/sheet-rose.component";

@Component({
  selector: "app-sheet",
  templateUrl: "./sheet.page.html",
  styleUrls: ["./sheet.page.scss"],
  imports: [CommonModule, FormsModule, IonicModule, SheetRoseComponent],
})
export class SheetPage {}
