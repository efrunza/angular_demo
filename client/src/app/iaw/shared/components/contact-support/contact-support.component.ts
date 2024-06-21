import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { takeUntil, tap } from 'rxjs/operators';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact-support-info',
  templateUrl: 'contact-support-info.html'
})
export class ContactSupportInfoComponent {
  constructor(private dialogRef: MatDialogRef<ContactSupportComponent>) {}

  openLink(event: MouseEvent): void {
    this.dialogRef.close();
    event.preventDefault();
  }
}

@Component({
  selector: 'app-contact-support',
  templateUrl: './contact-support.component.html',
  styleUrls: ['./contact-support.component.scss']
})
export class ContactSupportComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog, private mediaObserver: MediaObserver) {
    mediaObserver
      .asObservable()
      .pipe(
        tap((changes: MediaChange[]) => {
          this.isMobile = !!changes.find(change => change.mqAlias === 'lt-md');
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }
  isMobile = false;
  destroyed$ = new Subject();

  ngOnInit() {}

  openBottomSheet(): void {
    this.dialog.open(ContactSupportInfoComponent, {
      position: this.isMobile
        ? null
        : {
            bottom: '2vh',
            right: '100px'
          }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }
}
