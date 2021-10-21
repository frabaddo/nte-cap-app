import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeModuleLeaveGuard } from './change-module-leave.guard';
import { ChangeModuleEnterGuard } from './change-module-enter.guard';
import { PanzoomAreaComponent } from './panzoom-area/panzoom-area.component';
import { HexagonComponent } from './hexagon/hexagon.component';

@NgModule({
  declarations: [
    PanzoomAreaComponent,
    HexagonComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    { provide: 'PreviousModuleNavigation', useValue: new Map<string,string>()},
    ChangeModuleLeaveGuard,
    ChangeModuleEnterGuard
  ],
  exports:[
    PanzoomAreaComponent,
    HexagonComponent
  ]
})
export class SharedModule { }
