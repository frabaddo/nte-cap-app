import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
} from "@ionic/angular/standalone";
@Component({
  selector: "app-sheets",
  templateUrl: "./sheets.page.html",
  styleUrls: ["./sheets.page.scss"],
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    IonButton,
    IonItem,
    IonList,
    RouterLink,
    FormsModule,
  ],
})
export class SheetsPage {
  router = inject(Router);
  route = inject(ActivatedRoute);

  charactersIds = signal<number[]>(
    JSON.parse(localStorage.getItem("characters") ?? "[]") as number[]
  );

  charactersData = computed(() => {
    return (
      this.charactersIds()?.map((id) => ({
        name: localStorage.getItem(id + "-" + "sheet")
          ? JSON.parse(localStorage.getItem(id + "-" + "sheet"))?.name
          : "",
        id,
      })) ?? []
    );
  });

  ionViewWillEnter() {
    this.charactersIds.set(
      JSON.parse(localStorage.getItem("characters")) as number[]
    );
  }

  addNewChar() {
    let newId =
      Math.max(...(this.charactersIds()?.length ? this.charactersIds() : [0])) +
      1;
    let newChars = [
      ...(this.charactersIds()?.length ? this.charactersIds() : []),
      newId,
    ];

    this.charactersIds.set(newChars);
    localStorage.setItem("characters", JSON.stringify(newChars));
    this.router.navigate([newId], { relativeTo: this.route });
  }
}
