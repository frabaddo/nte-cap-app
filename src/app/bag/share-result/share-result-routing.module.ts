import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareResultPage } from './share-result.page';

const routes: Routes = [
  {
    path: '',
    component: ShareResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareResultPageRoutingModule {}
