import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy 
{
  
  title = 'iap-web';
  displayedName: string;
  loadingText: string;
  isInvalidLoginAttempt = false;

  constructor(private router: Router) { }

  ngOnInit(): void 
  {
    this.loadingText = 'Loading Application Information... Please Wait';

    this.displayedName = 'Eugen Frunza';

    const userInfo = {
      firstName: 'Eugen',
      lastName: 'Frunza',
      emails: '["efrunza@hotmail.com"]'
    };
  }

  ngOnDestroy(): void { }
}
