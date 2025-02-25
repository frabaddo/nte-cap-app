import { APP_BASE_HREF } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { InfoComponent } from "./info/info.component";

describe("AppComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AppComponent, InfoComponent],
      imports: [
        BrowserModule,
        IonicModule.forRoot({ hardwareBackButton: false }),
        AppRoutingModule,
      ],
      providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: APP_BASE_HREF, useValue: "/" },
      ],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // TODO: add more tests!
});
