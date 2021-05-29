import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, PopoverController } from '@ionic/angular';

import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let element: DebugElement;
  let popoverController: PopoverController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoComponent ],
      imports: [IonicModule.forRoot(),RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  }));

  beforeEach(inject([PopoverController],(popo)=>{
    jest.spyOn(popo,"dismiss").mockImplementation(()=>{return Promise.resolve(false)});
    popoverController = popo;
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close popover on close button', () => {
    element.query(By.css('ion-button[slot="end"]')).triggerEventHandler("click",null);

    expect(popoverController.dismiss).toHaveBeenCalled();
  });
});
