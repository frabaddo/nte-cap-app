import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InsertTokenPage } from './insert-token.page';

import { InsertTokenPageRoutingModule } from './insert-token-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsertTokenPageRoutingModule
  ],
  declarations: [InsertTokenPage]
})
export class InsertTokenPageModule {}
