import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-info-release',
  templateUrl: './info-release.component.html',
  styleUrls: ['./info-release.component.scss']
})
export class InfoReleaseComponent implements OnInit, OnDestroy {
  constructor() {}

  destroyed$ = new Subject();
  
  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }
}