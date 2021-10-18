import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'insert-token',
        pathMatch: 'full'
    },
    {
        path: 'insert-token',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    },
    {
        path: 'result',
        loadChildren: () => import('./result/result.module').then( m => m.ResultPageModule)
    },
    {
        path: 'token-selection',
        loadChildren: () => import('./token-selection/token-selection.module').then( m => m.TokenSelectionPageModule)
    },
    {
        path: 'share-result',
        loadChildren: () => import('./share-result/share-result.module').then( m => m.ShareResultPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class BagRoutingModule { }
