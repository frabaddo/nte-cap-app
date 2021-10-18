import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareResultPageRoutingModule } from './share-result-routing.module';

import { ShareResultPage } from './share-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareResultPageRoutingModule
  ],
  declarations: [ShareResultPage]
})
export class ShareResultPageModule {}
