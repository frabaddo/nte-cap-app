import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { ResultPage } from './result.page';

describe('ResultPage', () => {
  let component: ResultPage;
  let fixture: ComponentFixture<ResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultPage ],
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
