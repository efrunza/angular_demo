import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ApplicationService } from '../../services/application.service';;
import { ActivatedRoute, Router } from '@angular/router';
import { commonEnv } from '../../../../environments/environment.common';
import { ApplicationStatusObject, routeList, IApplicantInfo } from '../../models';
import { ApplicationHttpService, HttpServicePI, HttpServiceAI } from '../../services/application-http.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject();
  loadingError: boolean;
  loading: boolean;
  applicationStatusObject = ApplicationStatusObject;

  constructor
  (
    public applicationService: ApplicationService,
    public httpServiceAI: HttpServiceAI,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.selectApplicantInfo();
  }

  selectApplicantInfo() {

    const appId = this.route.snapshot.queryParams.appId;

    this.getApplicantInfo().subscribe(

      applicantInfo => {
        this.loading = false;
        this.loadingError = false;

        if (applicantInfo) {

          this.loadingError = false;

          if (applicantInfo.lastStep) {

            this.applicationService.lastStep = applicantInfo.lastStep;
          }
          else 
          {
            this.applicationService.lastStep = 0;
          }

          if (applicantInfo.status) 
          {
            this.applicationService.status = applicantInfo.status;
          }

          this.applicationService.isLastStep = true;

          if 
          (
            !this.router.url.match(`/${commonEnv.azureAgentCallbackUrl}/`) &&
            applicantInfo.status !== (this.applicationStatusObject.paid.value || this.applicationStatusObject.complete.value)
          ) 
          {
            this.applicationService.setLandingRoute(0);
          }
          else 
          {
            this.router.navigateByUrl(`${routeList.application.path}/${routeList.application.children.review}`
            );
          }
        }
      });
  }

  public getApplicantInfo(): Observable<IApplicantInfo> {
    
    let appId = '56000010000';

    let result: Observable<IApplicantInfo> = null;

    if (appId) 
    {

      let parameters = appId !== '00000000000' ? { appId: appId } : { appId: null };

      result = this.httpServiceAI.postRequest("getApplicationInfoAgent", parameters) as Observable<IApplicantInfo>;
    }
    else 
    {
      result = this.httpServiceAI.getAIRequest("getApplicationInfo") as Observable<IApplicantInfo>;
    }

    return result;
  };

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }
}
