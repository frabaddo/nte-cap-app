import { Location } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { BagService } from '../bag.service';

import { HomePage } from './home.page';

@Component({}) class FakePage {};

describe('HomePage', () => {
  let component: HomePage;
  let element: DebugElement;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;
  let location: Location;
  let bag: BagService;

  const routes: Routes = [
    {
      path:"",
      component: HomePage
    },
    {
      path:"token-selection",
      component: FakePage
    },
    {
      path:"result",
      component: FakePage
    },
    {
      path:"share-result",
      component: FakePage
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(),RouterTestingModule.withRoutes(routes)]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location); (3)
    bag = TestBed.inject(BagService); (3)

    router.initialNavigation();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    spyOn(component.bag,"insertTokens").and.callThrough();

    element = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("should be able to add token",()=>{
    it('white',()=>{
      element.query(By.css("#white-tokens ion-row ion-col:nth-child(3) ion-fab-button")).triggerEventHandler("click", null);
      
      expect(component.whiteToExtract).toEqual(2);
    })
  
    it('black',()=>{
      element.query(By.css("#black-tokens ion-row ion-col:nth-child(3) ion-fab-button")).triggerEventHandler("click", null);
  
      expect(component.blackToExtract).toEqual(2);
    })
  })

  describe("should be able to decrease token ",()=>{
    it('white',()=>{
      element.query(By.css("#white-tokens ion-row ion-col:nth-child(3) ion-fab-button")).triggerEventHandler("click", null);
      expect(component.whiteToExtract).toEqual(2);
  
      element.query(By.css("#white-tokens ion-row ion-col:nth-child(1) ion-fab-button")).triggerEventHandler("click", null);
  
      expect(component.whiteToExtract).toEqual(1);
    })
  
    it('black',()=>{
      element.query(By.css("#black-tokens ion-row ion-col:nth-child(3) ion-fab-button")).triggerEventHandler("click", null);
      expect(component.blackToExtract).toEqual(2);
  
      element.query(By.css("#black-tokens ion-row ion-col:nth-child(1) ion-fab-button")).triggerEventHandler("click", null);
  
      expect(component.blackToExtract).toEqual(1);
    })
  })

  describe("bag preparation",()=>{
    it('be able to prepare bag', fakeAsync(() => {
      component.increment(0);
      component.increment(1);
  
      component.preparebag();
      tick();
  
      expect(location.path()).toBe('/token-selection');
      expect(bag.Tokens.length).toEqual(4);
      expect(bag.insertTokens).toHaveBeenCalledTimes(1);
    }));
  
    it('be able to prepare bag with adrenalin', fakeAsync(() => {
      component.increment(0);
      component.increment(1);
      component.adrenalin = true;
  
      component.preparebag();
      tick();
  
      expect(location.path()).toBe('/result');
      expect(bag.ExtractedToken.length).toEqual(4)
      expect(bag.Tokens.length).toEqual(0);
      expect(bag.insertTokens).toHaveBeenCalledTimes(1);
    }));
  
    it('cant prepare empty bag', fakeAsync(() => {
      component.whiteToExtract=0;
      component.blackToExtract=0;
  
      component.preparebag();
      tick();
  
      expect(location.path()).toBe('/');
      expect(bag.ExtractedToken.length).toEqual(0);
      expect(bag.Tokens.length).toEqual(0);
      expect(bag.insertTokens).toHaveBeenCalledTimes(0);
    }));
  })

  it('should be able to clean bag',()=>{
    component.increment(0);
    component.increment(1);
    component.confusion = true;
    component.adrenalin = true;

    component.doRefresh({target:{complete:()=>{}}});

    expect(component.blackToExtract).toEqual(1);
    expect(component.whiteToExtract).toEqual(1);
    expect(component.confusion).toBeFalse();
    expect(component.adrenalin).toBeFalse();
  })

  it('should be able to refresh on return', fakeAsync(() => {
    component.increment(0);
    component.increment(1);
    component.preparebag();
    tick();

    router.navigate([""],{queryParams:{refresh:true}});
    tick();
    component.ionViewWillEnter();
    tick();

    expect(location.path()).toBe('/?refresh=true');
    expect(component.blackToExtract).toEqual(1);
    expect(component.whiteToExtract).toEqual(1);
    expect(bag.ExtractedToken.length).toEqual(0);
    expect(bag.Tokens.length).toEqual(0);
  }));
});
