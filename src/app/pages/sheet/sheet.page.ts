import {
  Component,
  effect,
  inject,
  input,
  signal,
  untracked,
  WritableSignal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
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
  IonList,
} from "@ionic/angular/standalone";
import {
  ExagonInfos,
  SheetRoseComponent,
} from "src/app/components/sheet/sheet-rose.component";

const exampleRowCel: () => ExagonInfos = () => ({
  text: "",
  image: null,
});

type Sheet = {
  sheet: ExagonInfos[][];
  confusion: ExagonInfos[][];
  adrenalin: ExagonInfos[][];
  missFortunes: ExagonInfos[][][];
  resources: string[];
};

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
    IonList,
    FormsModule,
  ],
})
export class SheetPage {
  id = inject(ActivatedRoute).snapshot.paramMap.get("id");
  popoverCtrl = inject(PopoverController);
  firstOpeningTip = signal<boolean>(false);
  effectSaveSheetData = effect(() => {
    localStorage.setItem(
      this.id + "-" + "sheet",
      JSON.stringify({
        sheet: this.sheet(),
        confusion: this.confusion(),
        adrenalin: this.adrenalin(),
        missFortunes: this.missFortunes().map((el) => el()),
        resources: this.resources().map((el) => el()),
      })
    );
  });

  constructor() {
    let data = localStorage.getItem(this.id + "-" + "sheet");
    if (data) {
      let sheet: Sheet = JSON.parse(data);
      this.sheet.set(sheet.sheet);
      this.adrenalin.set(sheet.adrenalin);
      this.confusion.set(sheet.confusion);
      this.missFortunes.set(sheet.missFortunes.map((el) => signal(el)));
      this.resources.set(sheet.resources.map((el) => signal(el)));
    }
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

  adrenalin = signal<ExagonInfos[][]>([
    [
      {
        text: "Adrenalina",
        image: "assets/action.png",
      },
    ],
  ]);
  confusion = signal<ExagonInfos[][]>([
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
