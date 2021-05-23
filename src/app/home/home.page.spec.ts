import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let element : DebugElement;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(),RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to add token white',()=>{
    element.query(By.css("#white-tokens ion-row ion-col:nth-child(3) ion-fab-button")).triggerEventHandler("click", null);
    
    expect(component.whiteToExtract).toEqual(2);
  })

  it('should be able to add token black',()=>{
    element.query(By.css("#black-tokens ion-row ion-col:nth-child(3) ion-fab-button")).triggerEventHandler("click", null);

    expect(component.blackToExtract).toEqual(2);
  })

  it('should be able to decrease token white',()=>{
    element.query(By.css("#white-tokens ion-row ion-col:nth-child(3) ion-fab-button")).triggerEventHandler("click", null);
    expect(component.whiteToExtract).toEqual(2);

    element.query(By.css("#white-tokens ion-row ion-col:nth-child(1) ion-fab-button")).triggerEventHandler("click", null);

    expect(component.whiteToExtract).toEqual(1);
  })

  it('should be able to decrease token black',()=>{
    element.query(By.css("#black-tokens ion-row ion-col:nth-child(3) ion-fab-button")).triggerEventHandler("click", null);
    expect(component.blackToExtract).toEqual(2);

    element.query(By.css("#black-tokens ion-row ion-col:nth-child(1) ion-fab-button")).triggerEventHandler("click", null);

    expect(component.blackToExtract).toEqual(1);
  })

  it('should be able to clean bag',()=>{
    component.increment(false);

    component.doRefresh({target:{complete:()=>{}}});

    expect(component.blackToExtract).toEqual(1);
  })
});
