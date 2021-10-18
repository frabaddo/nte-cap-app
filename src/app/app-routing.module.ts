import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bag',
    pathMatch: 'full'
  },
  {
    path: 'bag',
    loadChildren: () => import('./bag/bag.module').then( m => m.BagModule)
  },
  {
    path: 'sheet',
    loadChildren: () => import('./sheet/sheet.module').then( m => m.SheetPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
