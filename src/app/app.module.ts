import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [AppComponent,InfoComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({hardwareBackButton: false}), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  exports:[InfoComponent]
})
export class AppModule {}
