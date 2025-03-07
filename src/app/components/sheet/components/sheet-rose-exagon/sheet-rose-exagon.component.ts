import { Component, computed, input } from "@angular/core";
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
  topWhite = input<number | undefined>(undefined);
  topBlack = input<number | undefined>(undefined);

  cords = input<[number, number]>();

  cleanText = computed(() => this.text()?.trim());
  cleanImage = computed(() => this.image()?.trim());

  isPopupVisible = computed(
    () => this.isOpen() && (!!this.cleanImage() || !!this.cleanText())
  );

  showDetailContainer = computed(
    () => this.image() || this.topWhite() || this.topBlack()
  );
}
