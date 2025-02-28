import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SheetPage } from './sheet.page';

describe('SheetPage', () => {
  let component: SheetPage;
  let fixture: ComponentFixture<SheetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
