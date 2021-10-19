import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SheetPageRoutingModule } from './sheet-routing.module';

import { SheetPage } from './sheet.page';
import { RoseComponent } from './rose/rose.component';
import { HexagonComponent } from './hexagon/hexagon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SheetPageRoutingModule
  ],
  declarations: [SheetPage, RoseComponent, HexagonComponent]
})
export class SheetPageModule {}
