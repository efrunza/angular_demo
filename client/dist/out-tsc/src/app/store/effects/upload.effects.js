import * as tslib_1 from "tslib";
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UploadService } from 'shared/services/api/upload.service';
import { AppLoadError, AppSubmitError } from 'app/shared/models';
import { of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { EUploadActions, GetFilesFail, GetFilesSuccess, SubmitFilesFail, SubmitFilesSuccess } from '../actions';
import { applicantInfoSelectors } from '../selectors';
var UploadEffects = /** @class */ (function () {
    function UploadEffects(uploadService, actions$, store) {
        var _this = this;
        this.uploadService = uploadService;
        this.actions$ = actions$;
        this.store = store;
        this.getFiles$ = this.actions$.pipe(ofType(EUploadActions.GET_FILES), withLatestFrom(this.store.select(applicantInfoSelectors.selectApplicationID)), switchMap(function (_a) {
            var action = _a[0], appId = _a[1];
            return _this.uploadService.getFiles().pipe(map(function (filesResponse) {
                var toStore = {
                    id: appId,
                    files: []
                };
                for (var i = 0; i < filesResponse.length; i++) {
                    toStore.files.push({
                        docId: filesResponse[i].Document_Id,
                        fileName: filesResponse[i].Document_Name,
                        type: filesResponse[i].Document_Type
                    });
                }
                //Remove index for 'other' docId that makes it unique in DB
                for (var i = 0; i < toStore.files.length; i++) {
                    if (toStore.files[i].docId.indexOf('other') === 0) {
                        toStore.files[i].docId = 'other';
                    }
                }
                return new GetFilesSuccess(toStore);
            }), catchError(function (err) {
                var error = err instanceof HttpErrorResponse ? err.error : err;
                var displayError = error
                    ? new AppLoadError(error.id, error.message)
                    : new AppLoadError();
                return observableOf(new GetFilesFail(displayError));
            }));
        }));
        this.uploadFiles$ = this.actions$.pipe(ofType(EUploadActions.SUBMIT_FILES), switchMap(function (action) {
            if (action.payload) {
                return _this.uploadService.uploadFiles(action.payload).pipe(map(function (uploadResponse) {
                    return new SubmitFilesSuccess(uploadResponse);
                }), catchError(function (err) {
                    var error = err instanceof HttpErrorResponse ? err.error : err;
                    var displayError = error
                        ? new AppSubmitError(error.id, error.message)
                        : new AppSubmitError();
                    return observableOf(new SubmitFilesFail(displayError));
                }));
            }
            else {
                return observableOf(new SubmitFilesFail(new AppSubmitError('0', 'Invalid Response')));
            }
        }));
    }
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], UploadEffects.prototype, "getFiles$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Object)
    ], UploadEffects.prototype, "uploadFiles$", void 0);
    UploadEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [UploadService,
            Actions,
            Store])
    ], UploadEffects);
    return UploadEffects;
}());
export { UploadEffects };
//# sourceMappingURL=upload.effects.js.map