import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenSelectionPage } from './token-selection.page';

const routes: Routes = [
  {
    path: '',
    component: TokenSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenSelectionPageRoutingModule {}
