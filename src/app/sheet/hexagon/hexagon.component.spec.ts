import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HexagonComponent } from './hexagon.component';

describe('HexagonComponent', () => {
  let component: HexagonComponent;
  let fixture: ComponentFixture<HexagonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexagonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HexagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
