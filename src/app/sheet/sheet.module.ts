import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SheetPageRoutingModule } from './sheet-routing.module';

import { SheetPage } from './sheet.page';
import { RoseComponent } from './rose/rose.component';
import { SheetHexagonComponent } from './sheet-hexagon/sheet-hexagon.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SheetPageRoutingModule
  ],
  declarations: [SheetPage, RoseComponent, SheetHexagonComponent]
})
export class SheetPageModule {}
