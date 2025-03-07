import { CommonModule } from "@angular/common";
import {
  Component,
  effect,
  inject,
  signal,
  WritableSignal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, PopoverController } from "@ionic/angular";
import {
  ExagonInfos,
  SheetRoseComponent,
} from "src/app/components/sheet/sheet-rose.component";

const exampleRowCel: () => ExagonInfos = () => ({
  text: "", //"Lorem ipsum dolor sit amet",
  image:
    // Math.random() >= 0.5
    //   ? "https://www.svgrepo.com/show/532035/cloud-bolt.svg"
    //   : Math.random() >= 0.5
    //   ? "https://cdn.vectorstock.com/i/1000v/48/06/devil-ui-icon-dark-fantasy-game-sign-vector-43854806.jpg"
    //   :
    null,
});

@Component({
  selector: "app-sheet",
  templateUrl: "./sheet.page.html",
  styleUrls: ["./sheet.page.scss"],
  imports: [CommonModule, FormsModule, IonicModule, SheetRoseComponent],
})
export class SheetPage {
  popoverCtrl = inject(PopoverController);
  firstOpeningTip = signal<boolean>(false);
  effectSaveSheet = effect(() => {
    localStorage.setItem("sheet", JSON.stringify(this.sheet()));
  });
  effectSaveMissFortunes = effect(() => {
    localStorage.setItem(
      "missFortunes",
      JSON.stringify(this.missFortunes().map((el) => el()))
    );
  });

  constructor() {
    if (localStorage.getItem("sheet"))
      this.sheet.set(JSON.parse(localStorage.getItem("sheet")));
    if (localStorage.getItem("missFortunes"))
      this.missFortunes.set(
        JSON.parse(localStorage.getItem("missFortunes")).map((el) => signal(el))
      );
    this.firstOpeningTip.set(!!localStorage.getItem("firstOpeningTip"));
  }

  sheet = signal<ExagonInfos[][]>([
    new Array(1).fill(exampleRowCel()),
    new Array(2).fill(exampleRowCel()),
    new Array(3).fill(exampleRowCel()),
    new Array(2).fill(exampleRowCel()),
    new Array(3).fill(exampleRowCel()),
    new Array(2).fill(exampleRowCel()),
    new Array(3).fill(exampleRowCel()),
    new Array(2).fill(exampleRowCel()),
    new Array(1).fill(exampleRowCel()),
  ]);

  missFortunes = signal<WritableSignal<ExagonInfos[][]>[]>([
    signal([new Array(1).fill(exampleRowCel())]),
    signal([new Array(1).fill(exampleRowCel())]),
    signal([new Array(1).fill(exampleRowCel())]),
    signal([new Array(1).fill(exampleRowCel())]),
  ]);

  closeTipPopup() {
    localStorage.setItem("firstOpeningTip", "done");
    this.firstOpeningTip.set(true);
  }
}
