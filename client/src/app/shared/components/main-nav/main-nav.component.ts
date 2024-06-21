import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../../iaw/services/auth.service';
import { IUser, routeList, IApplicationStatusObject, IApplicantInfo } from '../../../iaw/models';
import { ApplicationHttpService, HttpServicePrg, HttpServiceAI } from '../../../iaw/services/application-http.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {
  user: IUser;
  applicationId: string;
  applicationStatus: string;
  isAtHomeScreen: boolean;
  isHandset$: Observable<boolean>;
  destroyed$: any;
  applicationStatusObject: IApplicationStatusObject;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private httpServiceAI: HttpServiceAI
  ) {
    this.user = this.authService.getUserInfo();

    this.destroyed$ = new Subject();

    this.applicationId = null;
    this.applicationStatus = null;
    this.isAtHomeScreen = false;

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches),
      takeUntil(this.destroyed$)
    );
  }

  ngOnInit() {
    this.httpServiceAI.getAIRequest("getApplicationInfo").subscribe(currentAppInfo => {
      if (currentAppInfo) {
        this.applicationId = currentAppInfo.appId;

        if (currentAppInfo.status) {
          if (this.applicationStatusObject) {
            Object.entries(this.applicationStatusObject).forEach(object => {
              if (object[1].value === currentAppInfo.status) {
                this.applicationStatus = object[1].text;
              }
            });
          }
        } else {
          this.applicationStatus = this.applicationStatusObject.new.text;
        }
      }
    });
  }

  onHomeClick = () => {
    this.router.navigateByUrl("iap");
  };

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  onSignOutClick() { }
}
