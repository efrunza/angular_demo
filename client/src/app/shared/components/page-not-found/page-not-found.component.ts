import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../iaw/services/auth.service';
import { Router } from '@angular/router';
import { commonEnv } from '../../../../environments/environment.common';
import { routeList } from '../../../iaw/models';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  loading: boolean;
  displayedName: string;
  userType: string;
  buttonText: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.displayedName = null;
    this.userType = null;
    this.buttonText = null;

    this.getUserType();
  }

  getUserType(): void {
    const userInfo = this.authService.getUserInfo();
    this.buttonText = 'Return to application';
    this.loading = false;
  }

  redirect(): void {
    if (this.userType === 'applicant') {
      this.router.navigateByUrl(`/${routeList.application.path}`);
    }
  }
}
