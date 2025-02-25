import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadComponent: () =>
      import("./home/home.page").then((m) => m.HomePage),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "result",
    loadComponent: () =>
      import("./result/result.page").then((m) => m.ResultPage),
  },
  {
    path: "token-selection",
    loadComponent: () =>
      import("./token-selection/token-selection.page").then(
        (m) => m.TokenSelectionPage,
      ),
  },
  {
    path: "share-result",
    loadComponent: () =>
      import("./share-result/share-result.page").then(
        (m) => m.ShareResultPage,
      ),
  },
  {
    path: "privacy",
    loadComponent: () =>
      import("./privacy/privacy.page").then((m) => m.PrivacyPage),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
