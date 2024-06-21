import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { combineLatest, Subject } from 'rxjs';

@Component({
  selector: 'app-upload-modal',
  templateUrl: 'app-upload-modal.html',
  styleUrls: ['./app-upload-modal.component.scss']
})
export class DocUploadInformationModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  constructor() {}

  destroyed$ = new Subject();
  
  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }
}
