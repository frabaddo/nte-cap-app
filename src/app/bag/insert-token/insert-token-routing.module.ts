import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertTokenPage } from './insert-token.page';

const routes: Routes = [
  {
    path: '',
    component: InsertTokenPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsertTokenPageRoutingModule {}
