import * as tslib_1 from "tslib";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, Subject } from 'rxjs';
import { EProgramChoiceActions, LoadProgramChoicesFail, LoadProgramChoicesSuccess, SubmitProgramChoicesFail, SubmitProgramChoicesSuccess } from '../actions';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { applicantInfoSelectors, englishProficiencySelectors, programChoiceSelectors } from '../selectors';
import { AppLoadError, AppSubmitError, ENGLISH_LANGUAGE_INSTITUTE, ProgramChoiceApp } from 'shared/models';
import { ProgramChoiceService } from 'shared/services/api/program-choice.service';
import { campusNameConverter } from 'app/utils';
var ProgramChoiceEffects = /** @class */ (function () {
    function ProgramChoiceEffects(actions$, service, store) {
        var _this = this;
        this.actions$ = actions$;
        this.service = service;
        this.store = store;
        this.destroyed$ = new Subject();
        this.getProgramChoices$ = this.actions$.pipe(ofType(EProgramChoiceActions.LOAD_PROGRAM_CHOICES), withLatestFrom(this.store.select(programChoiceSelectors.selectProgramChoice), this.store.select(applicantInfoSelectors.selectCurrentAppInfo), this.store.select(englishProficiencySelectors.selectEnglishProfData)), switchMap(function (_a) {
            var action = _a[0], stored = _a[1], applicantInfo = _a[2], englishProf = _a[3];
            var eliOption = englishProf
                ? englishProf.eliOption
                : applicantInfo.EliOption;
            if (stored) {
                stored = _this.checkForEli(stored, eliOption);
                return observableOf(new LoadProgramChoicesSuccess(stored));
            }
            else {
                return _this.service.getProgramChoices().pipe(map(function (programChoice) {
                    var appId = applicantInfo.appId;
                    // we only need to check for eliOption once the return result from server is empty
                    // to force the first choice to be ELI
                    if (!programChoice || Object.entries(programChoice).length === 0) {
                        programChoice = new ProgramChoiceApp(appId);
                    }
                    else {
                        programChoice.applicationId = appId;
                        // the choices array contains at least one choice,
                        // no need to check for ELI program, just need formatting and displaying
                        // format the date from 'YYYY-MM' to Date format
                        programChoice.choices.map(function (choice) {
                            // cover the situation that the program is passed from the proficiency form
                            // and the date is not selected yet
                            if (choice) {
                                if (choice.startDate !== null) {
                                    choice.startDate = _this.formatDate(choice.startDate.toString());
                                }
                                choice.campus = campusNameConverter(choice.campus);
                                if (choice.program === ENGLISH_LANGUAGE_INSTITUTE.programCode) {
                                    choice.description = ENGLISH_LANGUAGE_INSTITUTE.programDesc;
                                    choice.acadCareer = ENGLISH_LANGUAGE_INSTITUTE.acadCareer;
                                    choice.acadPlan = ENGLISH_LANGUAGE_INSTITUTE.acadPlan;
                                }
                            }
                        });
                    }
                    programChoice = _this.checkForEli(programChoice, eliOption);
                    return new LoadProgramChoicesSuccess(programChoice);
                }), catchError(function (err) {
                    // the error could be either HttpErrorResponse, which comes from the server when the request failed
                    // or switch map error, needed checking and set manually
                    var error = err instanceof HttpErrorResponse ? err.error : err;
                    var displayError = error
                        ? new AppLoadError(error.id, error.message)
                        : new AppLoadError();
                    // either way, dispatch a LoadFail action
                    return observableOf(new LoadProgramChoicesFail(displayError));
                }));
            }
        }));
        this.postProgramChoices$ = this.actions$.pipe(ofType(EProgramChoiceActions.SUBMIT_PROGRAM_CHOICES), withLatestFrom(this.store.select(applicantInfoSelectors.selectApplicationID)), switchMap(function (_a) {
            var action = _a[0], appID = _a[1];
            var programChoices = {
                applicationId: appID,
                choices: action.payload
            };
            return _this.service.postProgramChoices(programChoices).pipe(map(function () {
                programChoices.choices.map(function (choice) {
                    // cover the situation that the program is passed from the proficiency form
                    // and the date is not selected yet
                    if (choice.startDate !== null) {
                        choice.startDate = _this.formatDate(choice.startDate.toString());
                    }
                    choice.campus = campusNameConverter(choice.campus);
                });
                return new SubmitProgramChoicesSuccess(programChoices);
            }), catchError(function (err) {
                var error = err instanceof HttpErrorResponse ? err.error : err;
                var displayError = error
                    ? new AppSubmitError(error.id, error.message)
                    : new AppSubmitError();
                return observableOf(new SubmitProgramChoicesFail(displayError));
            }));
        }), takeUntil(this.destroyed$));
        this.formatDate = function (stringDate) {
            var separator = '-';
            var date = stringDate.split(separator);
            // make sure the date from the API is in the right format, which is YYYY-MM
            if (date.length === 2) {
                var year = Number(date[0]);
                var month = Number(date[1]) - 1;
                return new Date(year, month);
            }
            return null;
        };
        this.checkForEli = function (programChoice, eliOption) {
            // manually add ELI as the first choice to the choices array if the English prof choice 2 (ELI) is selected
            // Locking the select program button for this choice is being handled in programChoice component.ts
            if (eliOption === '2') {
                // fail save for the case that the user saves ELI option 2 twice. we don't want to remove their previous choice based on the same ELI option.
                // They can do this in the program choice page
                // TODO: This won't be necessary if we simply don't call the English Proficiency post API if the ELI option stays the same and the user tries to do a second save
                if (!programChoice.choices[0] ||
                    (programChoice.choices[0] &&
                        programChoice.choices[0].program !==
                            ENGLISH_LANGUAGE_INSTITUTE.programCode)) {
                    programChoice.choices[0] = {
                        startDate: null,
                        campus: campusNameConverter(ENGLISH_LANGUAGE_INSTITUTE.campus),
                        program: ENGLISH_LANGUAGE_INSTITUTE.programCode,
                        description: ENGLISH_LANGUAGE_INSTITUTE.programDesc,
                        acadCareer: ENGLISH_LANGUAGE_INSTITUTE.acadCareer,
                        acadPlan: ENGLISH_LANGUAGE_INSTITUTE.acadPlan
                    };
                }
            }
            else {
                if (programChoice.choices[0] &&
                    programChoice.choices[0].program ===
                        ENGLISH_LANGUAGE_INSTITUTE.programCode) {
                    programChoice.choices = [];
                }
            }
            return programChoice;
        };
    }
    ProgramChoiceEffects.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], ProgramChoiceEffects.prototype, "getProgramChoices$", void 0);
    tslib_1.__decorate([
        Effect(),
        tslib_1.__metadata("design:type", Observable)
    ], ProgramChoiceEffects.prototype, "postProgramChoices$", void 0);
    ProgramChoiceEffects = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Actions,
            ProgramChoiceService,
            Store])
    ], ProgramChoiceEffects);
    return ProgramChoiceEffects;
}());
export { ProgramChoiceEffects };
//# sourceMappingURL=programChoice.effects.js.map