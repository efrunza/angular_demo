import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApplicantInfo, ESnackbarAction } from '../models';
import { MatSnackBar, MatDialog, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

    snackbarRef: MatSnackBarRef<SimpleSnackBar> = null;
    
    constructor
    (    
        private snackBar: MatSnackBar,
        private ngZone: NgZone,
        public dialog: MatDialog
    ) {};

    public showErrors(errorMessage:string):void
    {

        let action =  ESnackbarAction.REFRESH;

        this.ngZone.run(() => 
        {
        this.snackbarRef = this.snackBar.open
        (
            errorMessage, action, 
            {
            duration: action === ESnackbarAction.REFRESH ? null : 15000,
            panelClass: 'error-snackbar'
            }
        );
        })
    };

}