import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BagPage } from './bag.page';

const routes: Routes = [
    {
        path: '',
        component: BagPage,
        children:[
            {
                path: '',
                redirectTo: 'insert-token',
                pathMatch: 'full'
            },
            {
                path: 'insert-token',
                loadChildren: () => import('./insert-token/insert-token.module').then( m => m.InsertTokenPageModule),
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
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class BagRoutingModule { }
