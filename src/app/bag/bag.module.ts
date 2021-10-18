import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BagRoutingModule } from './bag-routing.module';
import { BagService } from './bag.service';
import { BagPage } from './bag.page';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    BagPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    BagRoutingModule
  ],
  providers:[BagService]
})
export class BagModule { }
