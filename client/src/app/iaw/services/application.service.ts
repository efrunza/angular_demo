import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { routeList, IPersonalInfo } from '../models';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class ApplicationService implements OnDestroy {

  personalInfoData: IPersonalInfo;
  programAvailabilityData: any;
  lastStep: number;
  destroyed$:any;
  loading: boolean;
  isLastStep: boolean;
  status: string;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) 
  {
    this.destroyed$ = new Subject();
    this.status = "";
   }

  toggleComplete(completedStepName: string): void 
  {
    let foundCurrentRoute = false;
    let completedStep = 0;

    const targetUrl = Object.values(routeList.application.children).find(
      (route, index) => {

        if (foundCurrentRoute) 
        {
          return true;
        } 
        else if (route.match(completedStepName)) 
        {          
          completedStep = index + 1;
          foundCurrentRoute = true;
        }

        return false;
      }
    );

    if (completedStep > 0) 
    {
      if (completedStep > this.lastStep) {
        this.lastStep = completedStep;
      }

      if (completedStep === 9) 
      {
        this.router.navigateByUrl(`/${routeList.complete}`);
      } 
      else 
      {
        this.router.navigateByUrl( `/${routeList.application.path}/${targetUrl}`
        );
      }
    }
  }

  getLastStepRoute(): string 
  {
    return (
      '/' +
      routeList.application.path +
      '/' +
      Object.values(routeList.application.children).find((route, index) => {
        return index === this.lastStep;
      })
    );
  }

  customNavigate(targetUrl: string) {
     
    this.router.navigateByUrl(`/${routeList.application.path}/${targetUrl}`);
  }

  setLandingRoute(lastStep:number): void {

    this.lastStep = lastStep;
    let newRoute = this.getLastStepRoute();

    this.router.navigate([newRoute]);
  }

  setPersonalInfo(personalInfoData: IPersonalInfo) {
    this.personalInfoData = personalInfoData;
  }

  getPersonalInfo() {
    return this.personalInfoData;
  }

  getProgramAvailabilityData() {
    return this.programAvailabilityData;
  }

  setProgramAvailabilityData(list: any) {
    this.programAvailabilityData = list;
  }

  getLastStep(): Observable<number> {
    return Observable.of(this.lastStep);
  }

  ngOnDestroy(): void { }
}
