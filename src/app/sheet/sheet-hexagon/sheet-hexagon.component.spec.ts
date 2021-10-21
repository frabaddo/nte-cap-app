import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SheetHexagonComponent } from './sheet-hexagon.component';

describe('SheetHexagonComponent', () => {
  let component: SheetHexagonComponent;
  let fixture: ComponentFixture<SheetHexagonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetHexagonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SheetHexagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
