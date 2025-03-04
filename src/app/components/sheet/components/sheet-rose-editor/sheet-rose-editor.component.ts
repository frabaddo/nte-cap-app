import { Component, inject, input, linkedSignal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";

@Component({
  selector: "app-sheet-rose-editor",
  templateUrl: "./sheet-rose-editor.component.html",
  styleUrls: ["./sheet-rose-editor.component.scss"],
  imports: [IonicModule, FormsModule],
})
export class SheetRoseEditorComponent {
  text = input<string>();
  image = input<string>();

  modalCtrl = inject(ModalController);

  inputText = linkedSignal(() => this.text());
  inputImage = linkedSignal(() => this.image());

  save() {
    this.modalCtrl.dismiss({
      text: this.inputText(),
      image: this.inputImage(),
    });
  }
}
