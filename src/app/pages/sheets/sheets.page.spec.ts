import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SheetsPage } from "./sheets.page";

describe("SheetsPage", () => {
  let component: SheetsPage;
  let fixture: ComponentFixture<SheetsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
