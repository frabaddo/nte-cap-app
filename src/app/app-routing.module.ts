import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./components/tabs/tabs.component").then((m) => m.TabsComponent),
    children: [
      {
        path: "",
        redirectTo: "bag",
        pathMatch: "full",
      },
      {
        path: "bag",
        children: [
          {
            path: "",
            redirectTo: "home",
            pathMatch: "full",
          },
          {
            path: "home",
            loadComponent: () =>
              import("./pages/home/home.page").then((m) => m.HomePage),
          },
          {
            path: "result",
            loadComponent: () =>
              import("./pages/result/result.page").then((m) => m.ResultPage),
          },
          {
            path: "token-selection",
            loadComponent: () =>
              import("./pages/token-selection/token-selection.page").then(
                (m) => m.TokenSelectionPage
              ),
          },
          {
            path: "share-result",
            loadComponent: () =>
              import("./pages/share-result/share-result.page").then(
                (m) => m.ShareResultPage
              ),
          },
          {
            path: "privacy",
            loadComponent: () =>
              import("./pages/privacy/privacy.page").then((m) => m.PrivacyPage),
          },
        ],
      },
      {
        path: "sheet",
        loadComponent: () =>
          import("./pages/sheet/sheet.page").then((m) => m.SheetPage),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
