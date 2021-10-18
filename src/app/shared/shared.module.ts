import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeModuleLeaveGuard } from './change-module-leave.guard';
import { ChangeModuleEnterGuard } from './change-module-enter.guard';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule
  ],
  providers:[
    { provide: 'PreviousModuleNavigation', useValue: new Map<string,string>()},
    ChangeModuleLeaveGuard,
    ChangeModuleEnterGuard
  ]
})
export class SharedModule { }
