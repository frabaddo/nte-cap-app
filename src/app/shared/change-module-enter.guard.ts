import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ChangeModuleEnterGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject('PreviousModuleNavigation') private modulesPath: Map<string, string>
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const module = next.routeConfig.path;
    if(this.modulesPath.has(module)){
      const path = this.modulesPath.get(module);
      this.modulesPath.delete(module);
      this.router.navigateByUrl(path)
      return false
    }
    else return true;
  }
  
}
