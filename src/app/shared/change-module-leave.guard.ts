import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ChangeModuleLeaveGuard implements CanDeactivate<any> {

  constructor(
    @Inject('PreviousModuleNavigation') private modulesPath: Map<string, string>
  ){}

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.modulesPath.set(currentRoute.routeConfig.path, currentState.url)
    return true;
  }
  
}