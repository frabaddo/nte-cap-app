import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TokenSelectionPageRoutingModule } from './token-selection-routing.module';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenSelectionPage } from './token-selection.page';

describe('TokenSelectionPage', () => {
  let component: TokenSelectionPage;
  let fixture: ComponentFixture<TokenSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenSelectionPage ],
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        TokenSelectionPageRoutingModule,
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TokenSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
