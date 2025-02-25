import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TokenSelectionPageRoutingModule } from "./token-selection-routing.module";

import { TokenSelectionPage } from "./token-selection.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TokenSelectionPageRoutingModule,
  ],
  declarations: [TokenSelectionPage],
})
export class TokenSelectionPageModule {}
