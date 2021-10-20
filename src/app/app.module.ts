import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InfoComponent } from './info/info.component';
import { BagModule } from './bag/bag.module';
import { SharedModule } from './shared/shared.module';
import * as Hammer from 'hammerjs';

export class HammerConfig extends HammerGestureConfig {
  overrides = {
    'pinch': {
      direction: Hammer.DIRECTION_ALL,
      enable: true
    }
  };
  doubletap = {
    
  };
}

@NgModule({
  declarations: [AppComponent,InfoComponent],
  entryComponents: [],
  imports: [BrowserModule, BrowserAnimationsModule, HammerModule, SharedModule, IonicModule.forRoot({hardwareBackButton: false}), AppRoutingModule, BagModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  bootstrap: [AppComponent],
  exports:[InfoComponent]
})
export class AppModule {}
