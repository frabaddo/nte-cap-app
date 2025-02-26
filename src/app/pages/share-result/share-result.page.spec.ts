import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { IonicModule } from "@ionic/angular";
import { of } from "rxjs";

import { ShareResultPage } from "./share-result.page";

describe("ShareResultPage", () => {
  let component: ShareResultPage;
  let fixture: ComponentFixture<ShareResultPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ShareResultPage],
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        IonicModule.forRoot(),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ t: 0, r: 0, e: 0 }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShareResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
