import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-program-choice',
  templateUrl: './program-choice.component.html',
  styleUrls: ['./program-choice.component.scss']
})
export class ProgramChoiceComponent implements OnInit, OnDestroy {

  constructor() { }

  destroyed$ = new Subject();

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }
}