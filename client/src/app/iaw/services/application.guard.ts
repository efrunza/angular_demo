import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { IUser, routeList } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuard implements CanActivate {
  userInfo: IUser;

  constructor(private authService: AuthService, private router: Router) {
    this.userInfo = this.authService.getUserInfo();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
