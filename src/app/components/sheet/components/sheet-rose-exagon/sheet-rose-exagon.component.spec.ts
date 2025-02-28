import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SheetRoseExagonComponent } from './sheet-rose-exagon.component';

describe('SheetRoseExagonComponent', () => {
  let component: SheetRoseExagonComponent;
  let fixture: ComponentFixture<SheetRoseExagonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetRoseExagonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SheetRoseExagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
