import {
  Component,
  effect,
  inject,
  signal,
  WritableSignal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  PopoverController,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonPopover,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonIcon,
} from "@ionic/angular/standalone";
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
  imports: [
    SheetRoseComponent,
    IonHeader,
    IonToolbar,
    IonContent,
    IonFooter,
    IonPopover,
    IonTitle,
    IonButton,
    IonInput,
    IonItem,
    IonIcon,
    FormsModule,
  ],
})
export class SheetPage {
  popoverCtrl = inject(PopoverController);
  firstOpeningTip = signal<boolean>(false);
  effectSaveSheet = effect(() => {
    localStorage.setItem("sheet", JSON.stringify(this.sheet()));
  });
  effectSaveConfusion = effect(() => {
    localStorage.setItem("confusion", JSON.stringify(this.confusion()));
  });
  effectSaveAdrenalin = effect(() => {
    localStorage.setItem("adrenalin", JSON.stringify(this.adrenalin()));
  });
  effectSaveMissFortunes = effect(() => {
    localStorage.setItem(
      "missFortunes",
      JSON.stringify(this.missFortunes().map((el) => el()))
    );
  });
  effectSaveResource = effect(() => {
    localStorage.setItem(
      "resources",
      JSON.stringify(this.resources().map((el) => el()))
    );
  });

  constructor() {
    if (localStorage.getItem("sheet"))
      this.sheet.set(JSON.parse(localStorage.getItem("sheet")));
    if (localStorage.getItem("adrenalin")) {
      let exagons = JSON.parse(localStorage.getItem("adrenalin"));
      this.adrenalin.update((val) => {
        return [
          [
            {
              ...exagons[0][0],
              text: "Adrenalina",
              image: "assets/action.png",
            },
          ],
        ];
      });
    }
    if (localStorage.getItem("confusion")) {
      let exagons = JSON.parse(localStorage.getItem("confusion"));
      this.confusion.update((val) => {
        return [
          [
            {
              ...exagons[0][0],
              text: "Confusione",
              image: "assets/confused.png",
            },
          ],
        ];
      });
    }
    if (localStorage.getItem("missFortunes"))
      this.missFortunes.set(
        JSON.parse(localStorage.getItem("missFortunes")).map((el) => signal(el))
      );
    if (localStorage.getItem("resources"))
      this.resources.set(
        JSON.parse(localStorage.getItem("resources")).map((el) => signal(el))
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

  confusion = signal<ExagonInfos[][]>([
    [
      {
        text: "Adrenalina",
        image: "assets/action.png",
      },
    ],
  ]);
  adrenalin = signal<ExagonInfos[][]>([
    [
      {
        text: "Confusione",
        image: "assets/confused.png",
      },
    ],
  ]);
  resources = signal<WritableSignal<string>[]>([]);

  addResource() {
    this.resources.update((r) => [...r.map((el) => signal(el())), signal("")]);
  }
  deleteResource(index: number) {
    this.resources.update((r) => [
      ...r.filter((el, i) => i !== index).map((el) => signal(el())),
    ]);
  }

  closeTipPopup() {
    localStorage.setItem("firstOpeningTip", "done");
    this.firstOpeningTip.set(true);
  }
}
