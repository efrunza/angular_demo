import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ApplicationStatusObject, AppLoadError, AppSubmitError, EdocIds, EdocTypes, EEliOption, ESnackbarAction, routeList } from 'shared/models';
import { DisplayErrorMessage, GetFiles, LoadAcademicInfo, LoadCountryList, LoadEnglishProficiency, LoadLanguageList, LoadPersonalInfo, LoadProgramChoices, LoadPrograms, ViewReviewSubmitSuccess } from 'app/store/actions';
import { academicSelectors, applicantInfoSelectors, countryListSelectors, englishProficiencySelectors, languageListSelectors, personalInfoSelectors, programChoiceSelectors, uploadSelectors } from 'app/store/selectors';
import { Router } from '@angular/router';
import { ApplicationService } from 'app/application/application.service';
/**
 * Review Submit Component
 *
 * Main component for displaying all user inputs data
 */
var ReviewSubmitComponent = /** @class */ (function () {
    function ReviewSubmitComponent(store, router, applicationService) {
        var _this = this;
        this.store = store;
        this.router = router;
        this.applicationService = applicationService;
        this.destroyed$ = new Subject();
        /**
         * Indicates if a loading screen should be shown and if the continue button should be disabled
         */
        this.loading = true;
        this.locked = true;
        /**
         * Hold the data to be displayed
         */
        this.persInfoDisplay = [];
        this.acadInfoDisplay = [];
        this.engProfDisplay = { option: null, data: [] };
        this.progChoiceDisplay = [];
        this.fileUpDisplay = [];
        /**
         * Table columns
         */
        this.persInfoColumns = ['label', 'text'];
        this.acadInfoColumns = ['level', 'name'];
        this.engProfColumnsOpt1 = [
            'testName',
            'testScore',
            'testDate',
            'testCountry'
        ];
        this.engProfColumnsOpt3 = ['partnerName', 'partnerDateCompletion'];
        this.progChoiceColumns = [
            'number',
            'term',
            'programCode',
            'programDesc',
            'campus'
        ];
        this.fileUpColumns = ['label', 'text'];
        /**
         * HTML Table used depends on English Prof. option picked
         */
        this.engProfOpt1 = false;
        this.engProfOpt3 = false;
        this.uploadValidityError = false;
        this.uploadMatchError = new AppLoadError(null, 'Please review the upload step and fix issues');
        this.applicationStatusObject = ApplicationStatusObject;
        this.headerFlexValue = 'calc(100% + 32px)';
        this.matCardActionsValue = 'space-between center';
        this.matActionsFxLayoutAlignValue = 'space-between center';
        //Continue to next page if all data was loaded succesfully
        this.onSaveClick = function (event) {
            // prevent page refresh onSubmit action
            event.preventDefault();
            if (!_this.locked) {
                // Page navigation is handled by shared.effects.ts
                _this.store.dispatch(new ViewReviewSubmitSuccess());
            }
            else if (_this.uploadValidityError) {
                _this.store.dispatch(new DisplayErrorMessage({
                    error: _this.uploadMatchError,
                    actionName: ESnackbarAction.NAVIGATE,
                    callback: _this.uploadMatchCallback
                }));
            }
            else {
                var error = new AppSubmitError(null, 'Something went wrong.. Please try again later');
                _this.store.dispatch(new DisplayErrorMessage({ error: error }));
            }
        };
        if (applicationService.status &&
            applicationService.status === this.applicationStatusObject.paid.value) {
            this.headerFlexValue = 'none';
            this.matCardActionsValue = 'center';
            this.matActionsFxLayoutAlignValue = 'center';
        }
    }
    /**
     * navigate to documentUpload component
     */
    ReviewSubmitComponent.prototype.uploadMatchCallback = function () {
        this.router.navigateByUrl(routeList.application.path + "/" + routeList.application.children.documentUpload);
    };
    /**
     * subscribes to the store and uses below functions
     */
    ReviewSubmitComponent.prototype.ngOnInit = function () {
        // initializing fake formGroup for the stepper functionality
        this.reviewSubmitForm = new FormGroup({});
        this.subscribeToAllData();
    };
    ReviewSubmitComponent.prototype.subscribeToAllData = function () {
        var _this = this;
        combineLatest(this.store.select(personalInfoSelectors.selectFormatted), this.store.select(academicSelectors.selectLatest), this.store.select(englishProficiencySelectors.selectEnglishProfData), this.store.select(programChoiceSelectors.selectProgramChoice), this.store.select(uploadSelectors.selectLatest), this.store.select(countryListSelectors.selectAll), this.store.select(countryListSelectors.selectError), this.store.select(languageListSelectors.selectAll), this.store.select(languageListSelectors.selectError), this.store.select(personalInfoSelectors.selectError), this.store.select(academicSelectors.selectError), this.store.select(englishProficiencySelectors.selectError), this.store.select(programChoiceSelectors.selectError), this.store.select(uploadSelectors.selectError), this.store.select(applicantInfoSelectors.selectCurrentAppInfo))
            .pipe(takeUntil(this.destroyed$), map(function (_a) {
            var persInfo = _a[0], acadInfo = _a[1], engProf = _a[2], progChoice = _a[3], fileUp = _a[4], countries = _a[5], countryErr = _a[6], languages = _a[7], langErr = _a[8], persError = _a[9], acadError = _a[10], engProfError = _a[11], progChoiceError = _a[12], fileError = _a[13], applicantInfo = _a[14];
            return {
                persInfo: persInfo,
                acadInfo: acadInfo,
                engProf: engProf,
                progChoice: progChoice,
                fileUp: fileUp,
                countries: countries,
                countryErr: countryErr,
                languages: languages,
                langErr: langErr,
                persError: persError,
                acadError: acadError,
                engProfError: engProfError,
                progChoiceError: progChoiceError,
                fileError: fileError,
                applicantInfo: applicantInfo
            };
        }))
            .subscribe(function (val) {
            var validCountries = false;
            if (val.countries) {
                if (val.countries.constructor === Array) {
                    if (val.countries.length > 0) {
                        validCountries = true;
                    }
                }
            }
            var validLanguages = false;
            if (val.languages) {
                if (val.languages.constructor === Array) {
                    if (val.languages.length > 0) {
                        validLanguages = true;
                    }
                }
            }
            //Fill display objects with data from store when possible
            if (val.persInfo &&
                _this.persInfoDisplay.length === 0 &&
                validCountries &&
                validLanguages) {
                _this.store.dispatch(new LoadPrograms({
                    id: '3',
                    year: 0,
                    month: 0,
                    visa: 'null'
                }));
                _this.fillPersInfoDisplay(val.persInfo, val.countries, val.languages);
            }
            if (val.acadInfo && _this.acadInfoDisplay.length === 0) {
                _this.fillAcadInfoDisplay(val.acadInfo);
            }
            if (val.engProf &&
                _this.engProfDisplay.data.length === 0 &&
                validCountries) {
                _this.fillEngProfDisplay(val.engProf, val.countries);
            }
            if (val.progChoice &&
                _this.progChoiceDisplay.length === 0 &&
                validCountries) {
                _this.fillProgChoiceDisplay(val.progChoice);
            }
            if (val.fileUp && _this.fileUpDisplay.length === 0) {
                _this.fillFileUpDisplay(val.fileUp);
            }
            //If there are no errors in the store, ensure it is not empty, else show errors
            if (!val.persError &&
                !val.acadError &&
                !val.engProfError &&
                !val.progChoiceError &&
                !val.fileError &&
                !val.countryErr &&
                !val.langErr) {
                _this.fillStoreIfEmpty(val, validCountries, validLanguages);
            }
            else {
                _this.showErrors(val);
            }
            //If store is not empty show the page
            if (val.persInfo &&
                val.acadInfo &&
                val.engProf &&
                val.progChoice &&
                val.fileUp &&
                validCountries &&
                validLanguages &&
                val.applicantInfo) {
                if (_this.checkUploadValidity(val.engProf, val.acadInfo, val.fileUp.files) === true) {
                    _this.loading = false;
                    _this.locked = false;
                }
                else {
                    _this.loading = false;
                    _this.locked = true;
                    _this.store.dispatch(new DisplayErrorMessage({
                        error: _this.uploadMatchError,
                        actionName: ESnackbarAction.NAVIGATE,
                        callback: _this.uploadMatchCallback
                    }));
                }
                // manually setting the reviewSubmitForm to valid when all the data is loaded
                _this.reviewSubmitForm.setErrors(null);
            }
            else {
                // manually setting the reviewSubmitForm to invalid if data cannot be loaded
                _this.reviewSubmitForm.setErrors({ incorrect: true });
            }
        });
    };
    /**
     * Validating uploaded files to make sure that the required files in english prof and academic info are uploaded when user changes their info in those pages
     * Please note that the validation is based on the number of uploaded files from the upload array in the upload store
     * Any changes in the upload component and/or it's store/state management might break this
     *
     * @param englishProfValue english prof value
     * @param academicInfoValue academic info value
     * @param previouslyUploadedFiles previous uploaded files
     */
    ReviewSubmitComponent.prototype.checkUploadValidity = function (englishProfValue, academicInfoValue, previouslyUploadedFiles) {
        var uploadValidity = false;
        var requiredUploadFiles = this.getRequiredUploadFiles(englishProfValue, academicInfoValue);
        uploadValidity = this.areUploadedFilesUpdated(previouslyUploadedFiles, requiredUploadFiles);
        this.uploadValidityError = !uploadValidity;
        return uploadValidity;
    };
    ReviewSubmitComponent.prototype.areUploadedFilesUpdated = function (previouslyUploadedFiles, requiredUploadFiles) {
        var previouslyUploadedIDs = [];
        var requiredIDs = [];
        for (var i = 0; i < previouslyUploadedFiles.length; i++) {
            Object.entries(previouslyUploadedFiles[i]).forEach(function (object) {
                var key = object[0];
                var value = object[1];
                if (key === 'docId') {
                    previouslyUploadedIDs.push(value);
                }
            });
        }
        for (var i = 0; i < requiredUploadFiles.length; i++) {
            Object.entries(requiredUploadFiles[i]).forEach(function (object) {
                var key = object[0];
                var value = object[1];
                if (key === 'docId') {
                    requiredIDs.push(value);
                }
            });
        }
        var doFilesMatch = false;
        /**
         * Returns TRUE if the first specified array contains all elements
         * from the second one. FALSE otherwise.
         */
        doFilesMatch = requiredIDs.every(function (value) {
            return previouslyUploadedIDs.indexOf(value) >= 0;
        });
        return doFilesMatch;
    };
    //Store may not be populated due to page loading directly without stepping through previous pages, or refreshing browser
    ReviewSubmitComponent.prototype.fillStoreIfEmpty = function (val, validCountries, validLanguages) {
        if (
        //Load data into store if not loaded already (more useful in development)
        !val.persInfo ||
            !val.acadInfo ||
            !val.engProf ||
            !val.progChoice ||
            !val.fileUp ||
            !validCountries ||
            !validLanguages) {
            if (!validCountries) {
                this.store.dispatch(new LoadCountryList());
            }
            else if (!validLanguages) {
                this.store.dispatch(new LoadLanguageList());
            }
            else if (!val.persInfo) {
                this.store.dispatch(new LoadPersonalInfo());
            }
            else if (!val.engProf) {
                this.store.dispatch(new LoadEnglishProficiency());
            }
            else if (!val.progChoice) {
                this.store.dispatch(new LoadProgramChoices());
            }
            else if (!val.acadInfo) {
                this.store.dispatch(new LoadAcademicInfo());
            }
            else if (!val.fileUp) {
                this.store.dispatch(new GetFiles());
            }
        }
        else {
            this.loading = false;
            this.locked = false;
        }
    };
    /**
     * Shows any errors in val with the appropriate action
     * @param store object value
     */
    ReviewSubmitComponent.prototype.showErrors = function (val) {
        var _this = this;
        //In case any essential data is missing, show an error with the appropriate action
        this.loading = false;
        if (val.persError) {
            this.store.dispatch(new DisplayErrorMessage({
                error: val.persError,
                callback: function () {
                    _this.store.dispatch(new LoadPersonalInfo());
                }
            }));
        }
        else if (val.acadError) {
            this.store.dispatch(new DisplayErrorMessage({
                error: val.acadError,
                callback: function () {
                    _this.store.dispatch(new LoadAcademicInfo());
                }
            }));
        }
        else if (val.engProfError) {
            this.store.dispatch(new DisplayErrorMessage({
                error: val.engProfError,
                callback: function () {
                    _this.store.dispatch(new LoadEnglishProficiency());
                }
            }));
        }
        else if (val.progChoiceError) {
            this.store.dispatch(new DisplayErrorMessage({
                error: val.progChoiceError,
                callback: function () {
                    _this.store.dispatch(new LoadProgramChoices());
                }
            }));
        }
        else if (val.fileError) {
            this.store.dispatch(new DisplayErrorMessage({
                error: val.fileError,
                callback: function () {
                    _this.store.dispatch(new GetFiles());
                }
            }));
        }
        else if (val.countryErr) {
            this.store.dispatch(new DisplayErrorMessage({
                error: val.countryErr,
                callback: function () {
                    _this.store.dispatch(new LoadCountryList());
                }
            }));
        }
        else if (val.langErr) {
            this.store.dispatch(new DisplayErrorMessage({
                error: val.langErr,
                callback: function () {
                    _this.store.dispatch(new LoadLanguageList());
                }
            }));
        }
    };
    /**
     * Formats Personal Info data and loads into an object
     * @param persInfo personal info data
     * @param countries list of countries
     * @param languages list of languages
     */
    ReviewSubmitComponent.prototype.fillPersInfoDisplay = function (persInfo, countries, languages) {
        //Set all language, country and province names to their codes in case countries and languages arrays have not loaded
        var countryOC = {
            name: persInfo.countryOC
        };
        var countryOA = {
            name: persInfo.countryOA
        };
        var primaryLang = {
            name: persInfo.primaryLang
        };
        var permaCountry = {
            name: persInfo.permanentAddress.country
        };
        var permaProvince = {
            name: persInfo.permanentAddress.province
        };
        //If countries and languages arrays have loaded, find all names for required countries/languages/provinces using their codes
        if (countries.length > 0) {
            var found = null;
            found = countries.find(function (country) { return country.code === persInfo.countryOC; });
            if (found) {
                countryOC = found;
            }
            found = null;
            found = countries.find(function (country) { return country.code === persInfo.countryOA; });
            if (found) {
                countryOA = found;
            }
            found = null;
            found = countries.find(function (country) { return country.code === persInfo.permanentAddress.country; });
            if (found) {
                permaCountry = found;
            }
            if (permaCountry.provinceList && persInfo.permanentAddress.province) {
                found = null;
                found = permaCountry.provinceList.find(function (province) { return province.code === persInfo.permanentAddress.province; });
                if (found) {
                    permaProvince = found;
                }
            }
        }
        if (languages.length > 0) {
            var found = null;
            found = null;
            found = languages.find(function (language) { return language.code === persInfo.primaryLang; });
            if (found) {
                primaryLang = found;
            }
        }
        //Make a string for the permanent Address and Phone
        var permAdress = persInfo.permanentAddress.stAddress;
        if (persInfo.permanentAddress.stAddress2) {
            permAdress += ' - ' + persInfo.permanentAddress.stAddress2;
        }
        if (persInfo.permanentAddress.city) {
            permAdress += ', ' + persInfo.permanentAddress.city;
        }
        if (permaProvince.name) {
            permAdress += ', ' + permaProvince.name;
        }
        if (permaCountry.name) {
            permAdress += ', ' + permaCountry.name;
        }
        if (persInfo.permanentAddress.zipCode) {
            permAdress += ' ' + persInfo.permanentAddress.zipCode;
            // persInfo.permanentAddress.zipCode.substr(0, 3) +
            // persInfo.permanentAddress.zipCode.substr(2, 3);
        }
        var phone = '(' +
            persInfo.permanentAddress.phone.countryCode +
            ') ' +
            persInfo.permanentAddress.phone.number;
        //As above for mailing address, if applicable
        var mailAdress = null;
        var mailPhone = null;
        if (persInfo.currAddrSameAsPerm === true) {
            mailAdress = persInfo.permanentAddress.stAddress;
            var mailCountry = {
                name: persInfo.permanentAddress.country
            };
            var mailProvince = {
                name: persInfo.permanentAddress.province
            };
            if (countries.length > 0) {
                var found = null;
                found = countries.find(function (country) { return country.code === persInfo.permanentAddress.country; });
                if (found) {
                    mailCountry = found;
                }
                if (mailCountry.provinceList && persInfo.permanentAddress.province) {
                    found = null;
                    found = mailCountry.provinceList.find(function (province) { return province.code === persInfo.permanentAddress.province; });
                    if (found) {
                        mailProvince = found;
                    }
                }
            }
            if (persInfo.permanentAddress.stAddress2) {
                mailAdress += ' - ' + persInfo.permanentAddress.stAddress2;
            }
            if (persInfo.permanentAddress.city) {
                mailAdress += ', ' + persInfo.permanentAddress.city;
            }
            if (mailProvince.name) {
                mailAdress += ', ' + mailProvince.name;
            }
            if (mailCountry.name) {
                mailAdress += ', ' + mailCountry.name;
            }
            if (persInfo.permanentAddress.zipCode) {
                mailAdress += ' ' + persInfo.permanentAddress.zipCode;
                // persInfo.permanentAddress.zipCode.substr(0, 3) +
                // persInfo.permanentAddress.zipCode.substr(2, 3);
            }
            // currAddrSameAsPerm ends here
        }
        else {
            mailAdress = persInfo.mailingAddress.stAddress;
            var mailCountry = {
                name: persInfo.permanentAddress.country
            };
            var mailProvince = {
                name: persInfo.permanentAddress.province
            };
            if (countries.length > 0) {
                var found = null;
                found = countries.find(function (country) { return country.code === persInfo.mailingAddress.country; });
                if (found) {
                    mailCountry = found;
                }
                if (mailCountry.provinceList && persInfo.mailingAddress.province) {
                    found = null;
                    found = mailCountry.provinceList.find(function (province) { return province.code === persInfo.mailingAddress.province; });
                    if (found) {
                        mailProvince = found;
                    }
                }
            }
            if (persInfo.mailingAddress.stAddress2) {
                mailAdress += ' - ' + persInfo.mailingAddress.stAddress2;
            }
            if (persInfo.mailingAddress.city) {
                mailAdress += ', ' + persInfo.mailingAddress.city;
            }
            if (mailProvince.name) {
                mailAdress += ', ' + mailProvince.name;
            }
            if (mailCountry.name) {
                mailAdress += ', ' + mailCountry.name;
            }
            if (persInfo.mailingAddress.zipCode) {
                mailAdress += ' ' + persInfo.mailingAddress.zipCode;
                // persInfo.mailingAddress.zipCode.substr(0, 3) +
                // persInfo.mailingAddress.zipCode.substr(2, 3);
            }
        }
        //Capitalize some things
        persInfo.title = this.capitalizeFirstLetter(persInfo.title);
        persInfo.gender = this.capitalizeFirstLetter(persInfo.gender);
        if (persInfo.gender === 'M') {
            persInfo.gender = 'Male';
        }
        else if (persInfo.gender === 'F') {
            persInfo.gender = 'Female';
        }
        else if (persInfo.gender === 'X') {
            persInfo.gender = 'Prefer not to say';
        }
        //Create the object to be accesed by HTML and displayed
        var temp = [
            { label: 'Previous Student ID', text: persInfo.previousStudentID },
            {
                label: 'Given names as they appear on passport',
                text: persInfo.title + '. ' + persInfo.firstName + ' ' + persInfo.surName
            },
            { label: 'Gender', text: persInfo.gender },
            { label: 'Date of Birth', text: persInfo.DOB },
            { label: 'Country of Citizenship', text: countryOC.name },
            {
                label: 'Country of Application',
                text: countryOA.name
            },
            { label: 'Primary Language', text: primaryLang.name },
            { label: 'Permanent Address', text: permAdress },
            { label: 'Phone', text: phone },
            { label: 'Email', text: persInfo.email },
            { label: 'Current Address', text: mailAdress },
            { label: "Receiver's Name", text: '' }
        ];
        this.persInfoDisplay = [];
        //Remove all empty data entries
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].text) {
                this.persInfoDisplay.push(temp[i]);
            }
        }
    };
    /**
     * Formats Academic Info data and loads into an object
     * @param acadInfo academic info data
     */
    ReviewSubmitComponent.prototype.fillAcadInfoDisplay = function (acadInfo) {
        //Create object for High School and push to display object
        if (acadInfo.highSchool.name) {
            var level = this.capitalizeFirstLetter(acadInfo.highSchool.level);
            var name_1 = acadInfo.highSchool.name;
            this.acadInfoDisplay.push({ level: level, name: name_1 });
        }
        //Create objects for Post Secondary Schools and push to display object
        if (acadInfo.postSecondaryEdus.length > 0) {
            for (var i = 0; i < acadInfo.postSecondaryEdus.length; i++) {
                var level = this.capitalizeFirstLetter(acadInfo.postSecondaryEdus[i].level);
                var name_2 = acadInfo.postSecondaryEdus[i].name;
                this.acadInfoDisplay.push({ level: level, name: name_2 });
            }
        }
    };
    /**
     *  Formats English Proficiency data and loads into an object
     * @param engProf english prof data
     * @param countries list of countries
     */
    ReviewSubmitComponent.prototype.fillEngProfDisplay = function (engProf, countries) {
        var option;
        //Set main display text based on option
        switch (engProf.eliOption) {
            case EEliOption.SUBMIT_SCORE:
                option = 'I will submit English Proficiency Test Scores';
                this.engProfColumns = this.engProfColumnsOpt1;
                this.engProfOpt1 = true;
                break;
            case EEliOption.ATTEND_ELI:
                option = 'I will attend English Language Institute (ELI) at Seneca';
                break;
            case EEliOption.ATTEND_PARTNERSHIP_INSTITUTIONS:
                option =
                    "I am/will be taking a pathway program at one of Seneca's English language partnership institutions";
                this.engProfColumns = this.engProfColumnsOpt3;
                this.engProfOpt3 = true;
                break;
            case EEliOption.NOT_APPLICABLE:
                option = 'Not Applicable / My primary language is English';
                break;
            default:
                option = 'ERROR';
                this.engProfColumns = [];
                break;
        }
        this.engProfDisplay.option = option;
        //Options 1 and 3 have extra data that are formatted for display and added to the display object
        if (engProf.eliOption === EEliOption.SUBMIT_SCORE) {
            //Set test country name to it's code in case countries array has not loaded
            var testCountry = {
                name: engProf.test.country
            };
            //If countries array has loaded, find the names of test country using it's code
            var found = null;
            if (countries.length > 0) {
                found = countries.find(function (country) { return country.code === engProf.test.country; });
            }
            if (found) {
                testCountry = found;
            }
            this.engProfDisplay.data = [
                {
                    testName: engProf.test.name,
                    testScore: engProf.test.score,
                    testDate: engProf.test.date,
                    testCountry: testCountry.name
                }
                //TODO: add .toDateString() after API updates
            ];
        }
        if (engProf.eliOption === EEliOption.ATTEND_PARTNERSHIP_INSTITUTIONS) {
            this.engProfDisplay.data = [
                {
                    partnerName: engProf.partner.name,
                    partnerDateCompletion: engProf.partner.dateCompletion
                }
            ];
            //TODO: add .toDateString() after API updates
        }
    };
    /**
     * Formats English Proficiency data and loads into an object
     * @param progChoice program choice data
     */
    ReviewSubmitComponent.prototype.fillProgChoiceDisplay = function (progChoice) {
        for (var i = 0; i < progChoice.choices.length; i++) {
            var programDesc = progChoice.choices[i].description;
            var programCode = progChoice.choices[i].program;
            var date = void 0;
            var term = void 0;
            date = progChoice.choices[i].startDate;
            if (date !== null) {
                var month = date.getMonth();
                switch (month) {
                    case 0:
                        term = 'Winter';
                        break;
                    case 8:
                        term = 'Fall';
                        break;
                    case 4:
                        term = 'Summer';
                        break;
                    default:
                        term = '';
                        break;
                }
                term += ' ' + date.getFullYear();
            }
            else {
                term = 'Not selected';
            }
            var campus = void 0;
            switch (progChoice.choices[i].campus) {
                case 'NH':
                    campus = 'Newnham';
                    break;
                case 'SY':
                    campus = 'Seneca@York';
                    break;
                case 'MK':
                    campus = 'Markham';
                    break;
                default:
                    campus = progChoice.choices[i].campus;
                    break;
            }
            //Push the program choice to display object
            this.progChoiceDisplay.push({
                number: i + 1,
                term: term,
                programCode: programCode,
                programDesc: programDesc,
                campus: campus,
                type: null
            });
        }
    };
    /**
     *  Formats File Upload data and loads into an object
     * @param fileUp file
     */
    ReviewSubmitComponent.prototype.fillFileUpDisplay = function (fileUp) {
        this.fileUpDisplay = null;
        var valid = false;
        if (fileUp) {
            if (fileUp.files) {
                if (fileUp.files.length > 0) {
                    valid = true;
                }
            }
        }
        if (valid) {
            this.fileUpDisplay = [];
            for (var i = 0; i < fileUp.files.length; i++) {
                var label = fileUp.files[i].docId;
                if (fileUp.files[i].docId === EdocIds.PASSPORT) {
                    label = 'Photo and signed Passport pages';
                }
                else if (fileUp.files[i].docId === EdocIds.STUDYPERMIT) {
                    label = 'Study Permit';
                }
                else if (fileUp.files[i].docId === EdocIds.SECONDARY_TRANSCRIPT) {
                    label = 'High School Transcripts';
                }
                else if (fileUp.files[i].docId === EdocIds.SECONDARY_DIPLOMA) {
                    label = 'High School (Grade 12 or Equivalent) Diploma';
                }
                else if (fileUp.files[i].docId.indexOf(EdocIds.POST_SECONDARY_TRANSCRIPT) !==
                    -1) {
                    label = fileUp.files[i].docId.replace(EdocIds.POST_SECONDARY_TRANSCRIPT + '-', 'Post Secondary Transcripts - ');
                }
                else if (fileUp.files[i].docId.indexOf(EdocIds.POST_SECONDARY_CERTIFICATION) !== -1) {
                    label = fileUp.files[i].docId.replace(EdocIds.POST_SECONDARY_CERTIFICATION + '-', 'Post Secondary Diploma/Degree - ');
                }
                else if (fileUp.files[i].docId.indexOf(EdocIds.ENGLISH_PROFICIENCY_PROOF) !==
                    -1) {
                    label = fileUp.files[i].docId.replace(EdocIds.ENGLISH_PROFICIENCY_PROOF + '-', 'Proof of English Proficiency - ');
                }
                else if (fileUp.files[i].docId === EdocIds.OTHER) {
                    label = 'Other';
                }
                if (fileUp.files[i].fileName) {
                    this.fileUpDisplay.push({
                        label: label,
                        text: fileUp.files[i].fileName
                    });
                }
                else {
                    this.fileUpDisplay.push({ label: label, text: 'Not Uploaded' });
                }
            }
        }
        else {
            this.fileUpDisplay = [{ label: 'No Files Uploaded', text: '' }];
        }
    };
    /**
     * Used in formatting to capitalize the first letter of names, etc.
     * @param string target string
     */
    ReviewSubmitComponent.prototype.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    /**
     * Fills the data object structure based on data in store and creates an array of files that need to be uploaded
     * @param englishProfValue english prof value
     * @param academicInfoValue academic info value
     */
    ReviewSubmitComponent.prototype.getRequiredUploadFiles = function (englishProfValue, academicInfoValue) {
        var data = [];
        var id = 0;
        var hsRow = null;
        if (academicInfoValue.highSchool.uploadDocumentsFlag) {
            hsRow = {
                sectionId: 1,
                groupTitle: 'High School Graduates',
                rows: [
                    {
                        showDelete: false,
                        docId: EdocIds.SECONDARY_TRANSCRIPT +
                            '-' +
                            academicInfoValue.highSchool.name,
                        type: EdocTypes.INTERNATIONAL_TRANSCRIPTS,
                        fieldId: 'j' + id,
                        fileInput: 'f' + id++,
                        fileName: '',
                        file: null,
                        rowLabels: ['Transcripts'],
                        required: true,
                        saved: false
                    },
                    {
                        showDelete: false,
                        docId: EdocIds.SECONDARY_DIPLOMA +
                            '-' +
                            academicInfoValue.highSchool.name,
                        type: EdocTypes.GRADUATION_DOCUMENTS,
                        fieldId: 'j' + id,
                        fileInput: 'f' + id++,
                        fileName: '',
                        file: null,
                        rowLabels: ['Diploma/Certificate of Completion'],
                        required: true,
                        saved: false
                    }
                ]
            };
        }
        var postSecRow = null;
        if (academicInfoValue.postSecondaryEdus) {
            if (academicInfoValue.postSecondaryEdus.length > 0) {
                var anyToUpload = false;
                for (var i = 0; i < academicInfoValue.postSecondaryEdus.length; i++) {
                    if (academicInfoValue.postSecondaryEdus[i].uploadDocumentsFlag) {
                        anyToUpload = true;
                    }
                }
                if (anyToUpload) {
                    postSecRow = {
                        sectionId: 2,
                        groupTitle: 'Post Secondary Graduates',
                        rows: []
                    };
                    for (var i = 0; i < academicInfoValue.postSecondaryEdus.length; i++) {
                        postSecRow.rows.push({
                            showDelete: false,
                            docId: EdocIds.POST_SECONDARY_TRANSCRIPT +
                                '-' +
                                academicInfoValue.postSecondaryEdus[i].name,
                            type: EdocTypes.INTERNATIONAL_TRANSCRIPTS,
                            fieldId: 'j' + id,
                            fileInput: 'f' + id++,
                            fileName: '',
                            file: null,
                            rowLabels: [
                                'Transcripts - ' + academicInfoValue.postSecondaryEdus[i].name
                            ],
                            required: true,
                            saved: false
                        });
                        postSecRow.rows.push({
                            showDelete: false,
                            docId: EdocIds.POST_SECONDARY_CERTIFICATION +
                                '-' +
                                academicInfoValue.postSecondaryEdus[i].name,
                            type: EdocTypes.GRADUATION_DOCUMENTS,
                            fieldId: 'j' + id,
                            fileInput: 'f' + id++,
                            fileName: '',
                            file: null,
                            rowLabels: [
                                'Diploma/Degree - ' +
                                    academicInfoValue.postSecondaryEdus[i].name
                            ],
                            required: true,
                            saved: false
                        });
                    }
                }
            }
        }
        var engProfRow = null;
        if (englishProfValue.eliOption === EEliOption.SUBMIT_SCORE &&
            englishProfValue.uploadDocument) {
            engProfRow = {
                sectionId: 3,
                groupTitle: 'Proof of English Proficiency',
                rows: [
                    {
                        showDelete: false,
                        docId: EdocIds.ENGLISH_PROFICIENCY_PROOF +
                            '-' +
                            englishProfValue.test.name,
                        type: EdocTypes.ENGLISH_TEST_SCORE,
                        fieldId: 'j' + id,
                        fileInput: 'f' + id++,
                        fileName: '',
                        file: null,
                        rowLabels: [englishProfValue.test.name],
                        required: true,
                        saved: false
                    }
                ]
            };
        }
        // data.push(idRow);
        if (hsRow) {
            data.push(hsRow);
        }
        if (postSecRow) {
            data.push(postSecRow);
        }
        if (engProfRow) {
            data.push(engProfRow);
        }
        // data.push(otherRow);
        var requiredUpload = {
            files: []
        };
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].rows.length; j++) {
                var fileName = null;
                if (data[i].rows[j].fileName) {
                    if (data[i].rows[j].saved || data[i].rows[j].file) {
                        fileName = data[i].rows[j].fileName;
                    }
                }
                requiredUpload.files.push({
                    docId: data[i].rows[j].docId,
                    type: data[i].rows[j].type,
                    fileName: fileName,
                    file: data[i].rows[j].file
                });
            }
        }
        return requiredUpload.files;
    };
    /**
     * takes in the key under routeList urls and returns the values
     * appends that value to first property of routeList object which is application
     * @param step index of step
     */
    ReviewSubmitComponent.prototype.editStep = function (step) {
        this.router.navigateByUrl(Object.keys(routeList)[0] + '/' + routeList.application.children[step]);
    };
    /**
     * window print, hide and show object is controlled by @print media in _ultilities.scss
     */
    ReviewSubmitComponent.prototype.print = function () {
        window.print();
    };
    ReviewSubmitComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    ReviewSubmitComponent = tslib_1.__decorate([
        Component({
            selector: 'app-review-submit',
            templateUrl: './review-submit.component.html',
            styleUrls: ['./review-submit.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Store,
            Router,
            ApplicationService])
    ], ReviewSubmitComponent);
    return ReviewSubmitComponent;
}());
export { ReviewSubmitComponent };
//# sourceMappingURL=review-submit.component.js.map