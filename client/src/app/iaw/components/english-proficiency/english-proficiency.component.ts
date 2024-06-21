import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-english-proficiency',
  templateUrl: './english-proficiency.component.html',
  styleUrls: ['./english-proficiency.component.scss']
})
export class EnglishProficiencyComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject();

  constructor(private applicationService:ApplicationService) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }
}
