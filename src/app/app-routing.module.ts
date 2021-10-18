import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChangeModuleEnterGuard } from './shared/change-module-enter.guard';
import { ChangeModuleLeaveGuard } from './shared/change-module-leave.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bag',
    pathMatch: 'full'
  },
  {
    path: 'bag',
    canDeactivate:[ChangeModuleLeaveGuard],
    canActivate:[ChangeModuleEnterGuard],
    loadChildren: () => import('./bag/bag.module').then( m => m.BagModule)
  },
  {
    path: 'sheet',
    canDeactivate:[ChangeModuleLeaveGuard],
    canActivate:[ChangeModuleEnterGuard],
    loadChildren: () => import('./sheet/sheet.module').then( m => m.SheetPageModule)
  },
  {
    path: 'home',
    canDeactivate:[ChangeModuleLeaveGuard],
    canActivate:[ChangeModuleEnterGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
