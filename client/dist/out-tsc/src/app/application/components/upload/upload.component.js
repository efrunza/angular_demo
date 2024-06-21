import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { AppSubmitError, EdocIds, EdocTypes, EEliOption, FieldIndex } from 'shared/models';
import { DisplayErrorMessage, GetFiles, LoadAcademicInfo, LoadApplicantInfo, LoadEnglishProficiency, SaveToStore, SubmitFiles, SubmitFilesSuccess } from 'app/store/actions';
import { academicSelectors, applicantInfoSelectors, englishProficiencySelectors, uploadSelectors } from 'app/store/selectors';
import { map, takeUntil } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
/**
 * Upload Component
 *
 * Main component for uploading user's files
 */
var DocUploadInformationModalComponent = /** @class */ (function () {
    function DocUploadInformationModalComponent(data) {
        this.data = data;
    }
    DocUploadInformationModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-upload-modal',
            templateUrl: 'app-upload-modal.html',
            styleUrls: ['./app-upload-modal.component.scss']
            // template: 'passed in {{data.dialogArr[i]}}'
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DocUploadInformationModalComponent);
    return DocUploadInformationModalComponent;
}());
export { DocUploadInformationModalComponent };
var UploadComponent = /** @class */ (function () {
    function UploadComponent(consolingDialog, store, dialog) {
        this.consolingDialog = consolingDialog;
        this.store = store;
        this.dialog = dialog;
        this.dialogArr = [
            this.dialogId,
            this.dialogHighschool,
            this.dialogPost,
            this.dialogEng,
            this.dialogOthers
        ];
        this.destroyed$ = new Subject();
        /**
         *  Loading screen shown when this is true
         */
        this.loading = false;
        /**
         *  Locked is true if there are any errors or if any required files are missing
         */
        this.locked = true;
        this.errors = false;
        /**
         *  This data object contains all data needed for this page, including uploaded files
         */
        this.data = [];
        /**
         *  This variable tracks if the data object has been filled with values from the store
         */
        this.filled = false;
        /**
         * This is the object that data to be uploaded will be saved into before uploading
         */
        this.finalUpload = null;
        /**
         * Same as above, for base64 strings as files instead of objects of the 'File' class
         */
        /**
         * Allowed file types
         */
        this.allowedTypes = ['gif', 'jpg', 'jpeg', 'pdf', 'png', 'tiff'];
        /**
         * String used on HTML file input to set allowed files
         */
        this.allowedTypesString = 'Only gif, jpg, jpeg, pdf, png and tiff file types are Allowed';
        /**
         * Error string containing all allowed types
         */
        this.allowedTypesError = '';
        /**
         * Checks if any file was added/removed so that API is only called if necessary
         */
        this.changes = false;
        /**
         * File size limit per file in bytes
         */
        this.fileSizeLimit = 10485760;
        /**
         * File size limit shown in error messages
         */
        this.fileSizeLimitString = '10MB';
        /**
         * Total file size limit in bytes
         */
        this.totalFileSizeLimit = 209715200;
        /**
         * Total file size limit shown in error messages
         */
        this.totalFileSizeLimitString = '200MB';
    }
    UploadComponent.prototype.openDialog = function (boxid) {
        for (var i = 0; i < this.dialogArr.length; i++) {
            this.dialogArr[i] = false;
        }
        this.dialogArr[boxid] = true;
        var dialogRef = this.dialog.open(DocUploadInformationModalComponent, {
            width: '50vw',
            minHeight: '25vh',
            data: {
                name: this.dialogArr
            }
        });
        dialogRef.afterClosed().subscribe(function (result) { });
    };
    //Subscribes to all store data relevant to this page and acts on changes, also fills allowedTypesString and allowedErrorString
    UploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.allowedTypesString = '';
        this.allowedTypesError = 'Only ';
        for (var i = 0; i < this.allowedTypes.length; i++) {
            if (i < this.allowedTypes.length - 2) {
                this.allowedTypesError += this.allowedTypes[i].toUpperCase() + ', ';
                this.allowedTypesString += '.' + this.allowedTypes[i] + ', ';
            }
            else if (i < this.allowedTypes.length - 1) {
                this.allowedTypesError += this.allowedTypes[i].toUpperCase() + ' and ';
                this.allowedTypesString += '.' + this.allowedTypes[i] + ', ';
            }
            else {
                this.allowedTypesError +=
                    this.allowedTypes[i].toUpperCase() + ' file types are accepted';
                this.allowedTypesString += '.' + this.allowedTypes[i];
            }
        }
        this.fileuploadForm = new FormGroup({});
        this.fileuploadForm.setErrors({ incorrect: true });
        combineLatest(this.store.select(applicantInfoSelectors.selectApplicationID), this.store.select(academicSelectors.selectLatest), this.store.select(englishProficiencySelectors.selectEnglishProfData), this.store.select(applicantInfoSelectors.selectError), this.store.select(academicSelectors.selectError), this.store.select(englishProficiencySelectors.selectError), this.store.select(uploadSelectors.selectLoading), this.store.select(uploadSelectors.selectError), this.store.select(uploadSelectors.selectSaveToStore), this.store.select(uploadSelectors.selectAll))
            .pipe(takeUntil(this.destroyed$), map(function (_a) {
            var id = _a[0], acadInfo = _a[1], engProf = _a[2], persError = _a[3], acadError = _a[4], engProfError = _a[5], loading = _a[6], error = _a[7], saveToStore = _a[8], storeData = _a[9];
            return {
                id: id,
                acadInfo: acadInfo,
                engProf: engProf,
                persError: persError,
                acadError: acadError,
                engProfError: engProfError,
                loading: loading,
                error: error,
                saveToStore: saveToStore,
                storeData: storeData
            };
        }))
            .subscribe(function (val) {
            //If there are no errors in the store, ensure it is not empty
            if (!val.persError &&
                !val.acadError &&
                !val.engProfError &&
                !val.error) {
                _this.fillStoreIfEmpty(val);
            }
            //If there are errors in the store, show them
            if (val.persError || val.acadError || val.engProfError || val.error) {
                _this.errors = true;
                _this.showErrors(val);
                _this.loading = false;
            }
            //If all required data from previous pages has loaded from the store, use it to build the structure of the data object if needed
            if (val.id && val.acadInfo && val.engProf && _this.data.length === 0) {
                _this.id = val.id;
                _this.fillDataObjectStructure(val);
            }
            //Show the loading screen when appropriate
            if ((val.id &&
                val.acadInfo &&
                val.engProf &&
                val.storeData.length > 0 &&
                !val.loading &&
                _this.data.length !== 0) ||
                (val.persError || val.acadError || val.engProfError || val.error)) {
                _this.loading = false;
            }
            else {
                _this.loading = true;
            }
            //Fill the data object from data in the store if not already done and if the store has any data
            if (val.storeData.length > 0 && !val.saveToStore && !_this.filled) {
                _this.fillDataObjectFromStore(val.storeData[val.storeData.length - 1]);
            }
            //Save or update the store when a successful upload takes place, and move to the next page
            if (val.saveToStore) {
                _this.store.dispatch(new SaveToStore(_this.convertDataToFilesInStore()));
            }
        });
    };
    /**
     * Fills store by loading required data if empty
     * @param val data value
     */
    UploadComponent.prototype.fillStoreIfEmpty = function (val) {
        if (
        //Load data into store if not loaded already (more useful in development)
        !val.id ||
            !val.acadInfo ||
            !val.engProf ||
            val.storeData.length === 0) {
            if (!val.id) {
                this.store.dispatch(new LoadApplicantInfo());
            }
            else if (!val.acadInfo) {
                this.store.dispatch(new LoadAcademicInfo());
            }
            else if (!val.engProf) {
                this.store.dispatch(new LoadEnglishProficiency());
            }
            else if (val.storeData.length === 0 && val.loading) {
                this.store.dispatch(new GetFiles());
            }
        }
    };
    /**
     *  Shows errors, if any, with their appropriate actions
     * @param val data value
     */
    UploadComponent.prototype.showErrors = function (val) {
        var _this = this;
        if (val.persError) {
            this.store.dispatch(new DisplayErrorMessage({
                error: val.persError,
                callback: function () {
                    _this.store.dispatch(new LoadApplicantInfo());
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
        else if (val.error && !val.loading) {
            this.store.dispatch(new DisplayErrorMessage({
                error: val.error,
                callback: function () {
                    _this.store.dispatch(new GetFiles());
                }
            }));
        }
    };
    /**
     * Find the index of the specified field in the local data variable
     * @param fieldid id of Field
     */
    UploadComponent.prototype.findIndex = function (fieldid) {
        var i;
        var j;
        var m;
        var result = new FieldIndex();
        for (i = 0; i < this.data.length; i++) {
            m = this.data[i];
            for (j = 0; j < m.rows.length; j++) {
                if (m.rows[j].fieldId === fieldid) {
                    result.groupIndex = i;
                    result.rowIndex = j;
                }
            }
        }
        return result;
    };
    /**
     *  Fills the data object structure based on data in store, but all files are empty
     * @param val data value
     */
    UploadComponent.prototype.fillDataObjectStructure = function (val) {
        var id = 0;
        var idRow = {
            sectionId: 0,
            groupTitle: 'Identification',
            rows: [
                {
                    showDelete: false,
                    docId: EdocIds.PASSPORT,
                    type: EdocTypes.PASSPORT,
                    fieldId: 'j' + id,
                    fileInput: 'f' + id++,
                    fileName: '',
                    file: null,
                    rowLabels: ["Photo and Signature Pages of Passport"],
                    required: true,
                    saved: false
                },
                {
                    showDelete: false,
                    docId: EdocIds.STUDYPERMIT,
                    type: EdocTypes.VISA_STUDY_PERMIT,
                    fieldId: 'j' + id,
                    fileInput: 'f' + id++,
                    fileName: '',
                    file: null,
                    rowLabels: ['Study Permit (If Available)'],
                    required: false,
                    saved: false
                }
            ]
        };
        var hsRow = null;
        if (val.acadInfo.highSchool.uploadDocumentsFlag) {
            hsRow = {
                sectionId: 1,
                groupTitle: 'High School Graduates',
                rows: [
                    {
                        showDelete: false,
                        docId: EdocIds.SECONDARY_TRANSCRIPT + '-' + val.acadInfo.highSchool.name,
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
                        docId: EdocIds.SECONDARY_DIPLOMA + '-' + val.acadInfo.highSchool.name,
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
        if (val.acadInfo.postSecondaryEdus) {
            if (val.acadInfo.postSecondaryEdus.length > 0) {
                var anyToUpload = false;
                for (var i = 0; i < val.acadInfo.postSecondaryEdus.length; i++) {
                    if (val.acadInfo.postSecondaryEdus[i].uploadDocumentsFlag) {
                        anyToUpload = true;
                    }
                }
                if (anyToUpload) {
                    postSecRow = {
                        sectionId: 2,
                        groupTitle: 'Post Secondary Graduates',
                        rows: []
                    };
                    for (var i = 0; i < val.acadInfo.postSecondaryEdus.length; i++) {
                        postSecRow.rows.push({
                            showDelete: false,
                            docId: EdocIds.POST_SECONDARY_TRANSCRIPT +
                                '-' +
                                val.acadInfo.postSecondaryEdus[i].name,
                            type: EdocTypes.INTERNATIONAL_TRANSCRIPTS,
                            fieldId: 'j' + id,
                            fileInput: 'f' + id++,
                            fileName: '',
                            file: null,
                            rowLabels: [
                                'Transcripts - ' + val.acadInfo.postSecondaryEdus[i].name
                            ],
                            required: true,
                            saved: false
                        });
                        postSecRow.rows.push({
                            showDelete: false,
                            docId: EdocIds.POST_SECONDARY_CERTIFICATION +
                                '-' +
                                val.acadInfo.postSecondaryEdus[i].name,
                            type: EdocTypes.GRADUATION_DOCUMENTS,
                            fieldId: 'j' + id,
                            fileInput: 'f' + id++,
                            fileName: '',
                            file: null,
                            rowLabels: [
                                'Diploma/Degree - ' + val.acadInfo.postSecondaryEdus[i].name
                            ],
                            required: true,
                            saved: false
                        });
                    }
                }
            }
        }
        var engProfRow = null;
        if (val.engProf.eliOption === EEliOption.SUBMIT_SCORE &&
            val.engProf.uploadDocument) {
            engProfRow = {
                sectionId: 3,
                groupTitle: 'Proof of English Proficiency',
                rows: [
                    {
                        showDelete: false,
                        docId: EdocIds.ENGLISH_PROFICIENCY_PROOF + '-' + val.engProf.test.name,
                        type: EdocTypes.ENGLISH_TEST_SCORE,
                        fieldId: 'j' + id,
                        fileInput: 'f' + id++,
                        fileName: '',
                        file: null,
                        rowLabels: [val.engProf.test.name],
                        required: true,
                        saved: false
                    }
                ]
            };
        }
        else if (val.engProf.eliOption === EEliOption.ATTEND_PARTNERSHIP_INSTITUTIONS &&
            val.engProf.uploadDocument) {
            engProfRow = {
                sectionId: 3,
                groupTitle: 'Proof of English Proficiency',
                rows: [
                    {
                        showDelete: false,
                        docId: EdocIds.ENGLISH_PROFICIENCY_PROOF,
                        type: EdocTypes.PATHWAY_PARTNER_LETTER,
                        fieldId: 'j' + id,
                        fileInput: 'f' + id++,
                        fileName: '',
                        file: null,
                        rowLabels: ['Pathway Partner Letter'],
                        required: true,
                        saved: false
                    }
                ]
            };
        }
        var otherRow = {
            sectionId: 4,
            groupTitle: 'Other Documents (If Applicable)',
            rows: [
                {
                    showDelete: false,
                    docId: EdocIds.OTHER,
                    type: EdocTypes.INTERNATIONAL_DOCUMENTS,
                    fieldId: 'j' + id,
                    fileInput: 'f' + id++,
                    fileName: '',
                    file: null,
                    rowLabels: ['Additional Documents'],
                    required: false,
                    saved: false
                }
            ]
        };
        this.data.push(idRow);
        if (hsRow) {
            this.data.push(hsRow);
        }
        if (postSecRow) {
            this.data.push(postSecRow);
        }
        if (engProfRow) {
            this.data.push(engProfRow);
        }
        this.data.push(otherRow);
        this.loading = false;
    };
    /**
     *  If there is any data in the store, fills the data object and assumes the file was saved previously
     * @param storeData data in the store
     */
    UploadComponent.prototype.fillDataObjectFromStore = function (storeData) {
        if (storeData) {
            if (storeData.files) {
                var id = 0;
                for (var i = 0; i < this.data.length - 1; i++) {
                    for (var j = 0; j < this.data[i].rows.length; j++) {
                        id++;
                        for (var x = 0; x < storeData.files.length; x++) {
                            if (this.data[i].rows[j].docId === storeData.files[x].docId) {
                                if (storeData.files[x].fileName) {
                                    this.data[i].rows[j].fileName = storeData.files[x].fileName;
                                    this.data[i].rows[j].showDelete = true;
                                    this.data[i].rows[j].saved = true;
                                }
                            }
                        }
                    }
                }
                var tempOtherRow = [];
                for (var x = 0; x < storeData.files.length; x++) {
                    if (storeData.files[x].docId.indexOf(EdocIds.OTHER) !== -1) {
                        tempOtherRow.push({
                            showDelete: true,
                            docId: EdocIds.OTHER,
                            type: EdocTypes.INTERNATIONAL_DOCUMENTS,
                            fieldId: 'j' + id,
                            fileInput: 'f' + id++,
                            fileName: storeData.files[x].fileName,
                            file: null,
                            rowLabels: ['Additional Documents'],
                            required: false,
                            saved: true
                        });
                    }
                }
                this.data[this.data.length - 1].rows = tempOtherRow;
            }
        }
        this.limitOtherRow();
        this.checkIfRequiredFilled();
        this.filled = true;
    };
    /**
     *  Click the hidden upload button (this is hidden as we use a custom button instead)
     */
    UploadComponent.prototype.clickUpload = function (fileinput) {
        document.getElementById(fileinput).click();
    };
    /**
     *  Checks if all required fields have files in them
     */
    UploadComponent.prototype.checkIfRequiredFilled = function () {
        this.locked = false;
        this.fileuploadForm.setErrors(null);
        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < this.data[i].rows.length; j++) {
                if (this.data[i].rows[j].required) {
                    if (!this.data[i].rows[j].file && !this.data[i].rows[j].saved) {
                        this.locked = true;
                        this.fileuploadForm.setErrors({ incorrect: true });
                    }
                }
            }
        }
    };
    /**
     *  Adds an empty row to the other section if needed, until the limit
     * @param limit row limit
     */
    UploadComponent.prototype.limitOtherRow = function (limit) {
        if (limit === void 0) { limit = 5; }
        if (this.data.length > 0) {
            var index = 0;
            for (var i = 0; i < this.data.length; i++) {
                for (var j = 0; j < this.data[i].rows.length; j++) {
                    index++;
                }
            }
            if (this.data[this.data.length - 1].rows.length > 0) {
                if ((this.data[this.data.length - 1].rows[this.data[this.data.length - 1].rows.length - 1].file ||
                    this.data[this.data.length - 1].rows[this.data[this.data.length - 1].rows.length - 1].saved) &&
                    this.data[this.data.length - 1].rows.length < limit) {
                    this.data[this.data.length - 1].rows.push({
                        showDelete: false,
                        docId: EdocIds.OTHER,
                        type: EdocTypes.INTERNATIONAL_DOCUMENTS,
                        fieldId: 'j' + index,
                        fileInput: 'f' + index,
                        fileName: '',
                        file: null,
                        rowLabels: ['Additional Documents'],
                        required: false,
                        saved: false
                    });
                }
            }
            else {
                this.data[this.data.length - 1].rows.push({
                    showDelete: false,
                    docId: EdocIds.OTHER,
                    type: EdocTypes.INTERNATIONAL_DOCUMENTS,
                    fieldId: 'j' + index,
                    fileInput: 'f' + index,
                    fileName: '',
                    file: null,
                    rowLabels: ['Additional Documents'],
                    required: false,
                    saved: false
                });
            }
        }
        var id = 0;
        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < this.data[i].rows.length; j++) {
                if (this.data[i].rows[j].docId.indexOf(EdocIds.OTHER) === -1) {
                    id++;
                }
            }
        }
        var tempOtherRow = {
            groupTitle: this.data[this.data.length - 1].groupTitle,
            sectionId: 4,
            rows: []
        };
        for (var i = 0; i < this.data[this.data.length - 1].rows.length; i++) {
            if (this.data[this.data.length - 1].rows[i].file ||
                this.data[this.data.length - 1].rows[i].saved) {
                tempOtherRow.rows.push(this.data[this.data.length - 1].rows[i]);
            }
        }
        for (var i = 0; i < tempOtherRow.rows.length; i++) {
            tempOtherRow.rows[i].docId = EdocIds.OTHER;
            tempOtherRow.rows[i].type = EdocTypes.INTERNATIONAL_DOCUMENTS;
            tempOtherRow.rows[i].fieldId = 'j' + id;
            tempOtherRow.rows[i].fileInput = 'f' + id++;
        }
        if (tempOtherRow.rows.length < limit) {
            tempOtherRow.rows.push({
                showDelete: false,
                docId: EdocIds.OTHER,
                type: EdocTypes.INTERNATIONAL_DOCUMENTS,
                fieldId: 'j' + id,
                fileInput: 'f' + id,
                fileName: '',
                file: null,
                rowLabels: ['Additional Documents'],
                required: false,
                saved: false
            });
        }
        this.data[this.data.length - 1] = tempOtherRow;
    };
    /**
     *  Validate the file set and add it to the local data variable
     * @param e MouseEvent
     * @param fieldid field Id
     */
    UploadComponent.prototype.addFile = function (e, fieldid) {
        this.changes = true;
        var fileInput = e.target;
        var files = fileInput.files;
        var tindex = this.findIndex(fieldid);
        var file = null;
        var filename = '';
        var valid = false;
        for (var key in files) {
            if (!isNaN(parseInt(key, 10))) {
                //Type, size and filename checking
                var validType = false;
                for (var i = 0; i < this.allowedTypes.length; i++) {
                    if (files[key].type.indexOf(this.allowedTypes[i]) !== -1) {
                        validType = true;
                    }
                }
                if (validType) {
                    if (files[key].size <= this.fileSizeLimit) {
                        valid = true;
                    }
                    else {
                        var error = new AppSubmitError(null, "Files cannot exceed " + this.fileSizeLimitString + " in size");
                        this.store.dispatch(new DisplayErrorMessage({ error: error }));
                    }
                }
                else {
                    var error = new AppSubmitError(null, this.allowedTypesError);
                    this.store.dispatch(new DisplayErrorMessage({ error: error }));
                }
                if (valid) {
                    var totalSize = files[key].size;
                    for (var i = 0; i < this.data.length; i++) {
                        for (var j = 0; j < this.data[i].rows.length; j++) {
                            if (this.data[i].rows[j].file) {
                                totalSize += this.data[i].rows[j].file.size;
                            }
                        }
                    }
                    if (totalSize > this.totalFileSizeLimit) {
                        valid = false;
                        var error = new AppSubmitError(null, "All files cannot exceed a size of " + this.totalFileSizeLimitString + " in total");
                        this.store.dispatch(new DisplayErrorMessage({ error: error }));
                    }
                }
                if (valid) {
                    filename = files[key].name;
                    file = files[key];
                }
            }
        }
        if (valid) {
            this.data[tindex.groupIndex].rows[tindex.rowIndex].file = file;
            this.data[tindex.groupIndex].rows[tindex.rowIndex].fileName = filename;
            this.data[tindex.groupIndex].rows[tindex.rowIndex].showDelete = true;
            this.data[tindex.groupIndex].rows[tindex.rowIndex].saved = false;
            this.limitOtherRow();
        }
        this.checkIfRequiredFilled();
    };
    /**
     *  Remove the file from the local data variable and the file input element
     * @param fieldid field id
     * @param fileinput file inputs
     */
    UploadComponent.prototype.deleteFile = function (fieldid, fileinput) {
        this.changes = true;
        var tindex = this.findIndex(fieldid);
        var a = document.getElementById(fileinput);
        a.value = '';
        this.data[tindex.groupIndex].rows[tindex.rowIndex].file = null;
        this.data[tindex.groupIndex].rows[tindex.rowIndex].fileName = '';
        this.data[tindex.groupIndex].rows[tindex.rowIndex].showDelete = false;
        this.data[tindex.groupIndex].rows[tindex.rowIndex].saved = false;
        this.limitOtherRow();
        this.checkIfRequiredFilled();
    };
    /**
     *  Converts the data object to the format stored in the store
     */
    UploadComponent.prototype.convertDataToFilesInStore = function () {
        var filesInStore = {
            id: this.id,
            files: []
        };
        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < this.data[i].rows.length; j++) {
                if (this.data[i].rows[j].file || this.data[i].rows[j].saved) {
                    var fileName = null;
                    if (this.data[i].rows[j].file) {
                        fileName = this.data[i].rows[j].file.name;
                    }
                    else if (this.data[i].rows[j].fileName) {
                        fileName = this.data[i].rows[j].fileName;
                    }
                    filesInStore.files.push({
                        docId: this.data[i].rows[j].docId,
                        type: this.data[i].rows[j].type,
                        fileName: fileName
                    });
                }
            }
        }
        return filesInStore;
    };
    //Saves the data in the format to be uploaded
    UploadComponent.prototype.saveDataToFinalUpload = function () {
        var formData = new FormData();
        // index iterrator for files in the 'other' category
        var otherFilesIndex = 0;
        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < this.data[i].rows.length; j++) {
                if (this.data[i].rows[j].file || this.data[i].rows[j].saved) {
                    var fileName = 'unknown-file';
                    if (this.data[i].rows[j].fileName) {
                        fileName = this.data[i].rows[j].fileName;
                    }
                    if (this.data[i].rows[j].docId === EdocIds.OTHER) {
                        this.data[i].rows[j].docId += '-' + ++otherFilesIndex;
                    }
                    var fileInfo = {
                        docId: this.data[i].rows[j].docId,
                        type: this.data[i].rows[j].type,
                        fileName: fileName
                    };
                    // if there is a newly added file, append it to fileData otherwise just append the fileInfo without the data
                    if (this.data[i].rows[j].file) {
                        var fileBlob = new Blob([this.data[i].rows[j].file]);
                        formData.append('file', fileBlob, fileInfo.docId);
                    }
                    formData.append('fileInfo', JSON.stringify(fileInfo));
                }
            }
        }
        this.finalUpload = formData;
    };
    /**
     *  Opens the dialog box and `upload`s data
     */
    UploadComponent.prototype.onSaveClick = function () {
        var _this = this;
        if (!this.locked && !this.errors) {
            this.saveDataToFinalUpload();
            if (this.changes) {
                // Only call the API if changes were made
                this.consolingDialog
                    .open(DialogComponent, {
                    width: '500px',
                    data: { ok: 'ok' }
                })
                    .afterClosed()
                    .subscribe(function (result) {
                    if (result) {
                        _this.store.dispatch(new SubmitFiles(_this.finalUpload));
                    }
                });
            }
            else {
                //If no changes made, build a fake API response to call the success action directly
                var psuedoResponse_1 = [];
                this.finalUpload.getAll('fileInfo').forEach(function (fileInfo) {
                    fileInfo = JSON.parse(fileInfo);
                    psuedoResponse_1.push({
                        filename: fileInfo['fileName'],
                        uploadStatus: 'SUCCESS'
                    });
                });
                this.store.dispatch(new SubmitFilesSuccess({ files: psuedoResponse_1 }));
            }
        }
        else {
            if (this.locked) {
                this.store.dispatch(new DisplayErrorMessage({
                    error: new AppSubmitError(null, "Please upload all required files")
                }));
            }
            if (this.errors) {
                this.store.dispatch(new DisplayErrorMessage({
                    error: new AppSubmitError(null, "There was an error uploading files. Please try again")
                }));
                this.errors = false;
            }
        }
    };
    UploadComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    };
    UploadComponent = tslib_1.__decorate([
        Component({
            selector: 'app-upload',
            templateUrl: './upload.component.html',
            styleUrls: ['./upload.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog,
            Store,
            MatDialog])
    ], UploadComponent);
    return UploadComponent;
}());
export { UploadComponent };
//# sourceMappingURL=upload.component.js.map