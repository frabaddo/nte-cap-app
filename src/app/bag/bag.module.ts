import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BagRoutingModule } from './bag-routing.module';
import { BagService } from './bag.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BagRoutingModule
  ],
  providers:[BagService]
})
export class BagModule { }
