import { Component, inject, input, linkedSignal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  ModalController,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-sheet-rose-editor",
  templateUrl: "./sheet-rose-editor.component.html",
  styleUrls: ["./sheet-rose-editor.component.scss"],
  imports: [
    FormsModule,
    IonHeader,
    IonContent,
    IonToolbar,
    IonButton,
    IonTitle,
    IonItem,
    IonIcon,
    IonThumbnail,
    IonImg,
  ],
})
export class SheetRoseEditorComponent {
  text = input<string>();
  image = input<string>();
  topWhite = input<number | undefined>(undefined);
  topBlack = input<number | undefined>(undefined);
  disabled = input<boolean>(false);

  modalCtrl = inject(ModalController);

  inputText = linkedSignal(() => this.text());
  inputImage = linkedSignal(() => this.image());
  inputTopWhite = linkedSignal(() => this.topWhite());
  inputTopBlack = linkedSignal(() => this.topBlack());

  save() {
    this.modalCtrl.dismiss({
      text: this.inputText(),
      image: this.inputImage(),
      topWhite: this.inputTopWhite(),
      topBlack: this.inputTopBlack(),
    });
  }
}
