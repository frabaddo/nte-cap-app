import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShareResultPage } from './share-result.page';

describe('ShareResultPage', () => {
  let component: ShareResultPage;
  let fixture: ComponentFixture<ShareResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
