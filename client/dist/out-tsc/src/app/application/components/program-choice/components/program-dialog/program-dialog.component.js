import * as tslib_1 from "tslib";
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { programListSelectors } from 'app/store/selectors';
/**
 * Program Dialog Component
 *
 * Display a modal to display a list of programs
 */
var ProgramDialogComponent = /** @class */ (function () {
    function ProgramDialogComponent(dialogRef, 
    // inject the data, which is pass via config when open the dialog
    data, store) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.store = store;
        this.destroyed$ = new Subject();
        /**
         * control the column name
         */
        this.displayedColumns = ['programCode', 'programName', 'campus'];
        this.programListData = {
            id: null,
            list: [],
            loading: true,
            error: null,
            visa: null,
            month: null,
            year: null
        };
    }
    ProgramDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get all the programs in the list and take out whatever program is displayed
        this.store
            .select(programListSelectors.selectSelectedProgramList)
            .pipe(tap(function (programListData) {
            if (programListData) {
                // get all the selected program in the parent form a excludes them on the program list to show to users
                if (!programListData.loading && programListData.list.length > 0) {
                    programListData.list = programListData.list.reduce(function (merged, program) {
                        if (!_this.data.currentProgramChoices.find(function (description) { return program.programDesc === description; })) {
                            merged.push(program);
                        }
                        return merged;
                    }, []);
                    _this.dataSource = new MatTableDataSource(programListData.list);
                    _this.dataSource.paginator = _this.paginator;
                }
                _this.programListData = programListData;
            }
        }), takeUntil(this.destroyed$))
            .subscribe();
    };
    /**
     * set the selected program
     * @param row selected row
     */
    ProgramDialogComponent.prototype.selectProgram = function (row) {
        this.selectedProgram = row;
    };
    /**
     * search program by name
     * @param filterValue program name
     */
    ProgramDialogComponent.prototype.applyFilter = function (filterValue) {
        if (this.dataSource) {
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ProgramDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ProgramDialogComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], ProgramDialogComponent.prototype, "paginator", void 0);
    ProgramDialogComponent = tslib_1.__decorate([
        Component({
            selector: 'app-program-dialog',
            templateUrl: './program-dialog.component.html',
            styleUrls: ['./program-dialog.component.scss']
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, Store])
    ], ProgramDialogComponent);
    return ProgramDialogComponent;
}());
export { ProgramDialogComponent };
//# sourceMappingURL=program-dialog.component.js.map