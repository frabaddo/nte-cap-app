import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SheetPage } from './sheet.page';

describe('SheetPage', () => {
  let component: SheetPage;
  let fixture: ComponentFixture<SheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
