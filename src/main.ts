import { enableProdMode, importProvidersFrom, isDevMode } from "@angular/core";
import { environment } from "./environments/environment";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideAnimations } from "@angular/platform-browser/animations";
import { IonicRouteStrategy } from "@ionic/angular";
import { routes } from "./app/routes";
import {
  provideRouter,
  RouteReuseStrategy,
  withComponentInputBinding,
} from "@angular/router";
import { provideIonicAngular } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import {
  add,
  informationCircleOutline,
  closeOutline,
  logoGithub,
  close,
  remove,
} from "ionicons/icons";
import { provideServiceWorker } from "@angular/service-worker";

addIcons({
  add,
  informationCircleOutline,
  closeOutline,
  logoGithub,
  close,
  remove,
});

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideIonicAngular({
      hardwareBackButton: false,
      useSetInputAPI: true,
    }),
    provideRouter(routes, withComponentInputBinding()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
});
// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.log(err));
