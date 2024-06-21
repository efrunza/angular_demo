export var EUploadActions;
(function (EUploadActions) {
    EUploadActions["SAVE_TO_STORE"] = "[Upload] Save To Store";
    EUploadActions["GET_FILES"] = "[Upload] Get Files";
    EUploadActions["GET_FILES_SUCCESS"] = "[Upload] Get Files Success";
    EUploadActions["GET_FILES_FAIL"] = "[Upload] Get Files Fail";
    EUploadActions["SUBMIT_FILES"] = "[Upload] Submit Files";
    EUploadActions["SUBMIT_FILES_SUCCESS"] = "[Upload] Submit Files Success";
    EUploadActions["SUBMIT_FILES_FAIL"] = "[Upload] Submit Files Fail";
    EUploadActions["LOAD_UPLOADED_FILES"] = "[Upload] Load Uploaded Files";
    EUploadActions["LOAD_UPLOADED_FILES_SUCCESS"] = "[Upload] Load Uploaded Files Success";
    EUploadActions["LOAD_UPLOADED_FILES_FAIL"] = "[Upload] Load Uploaded Files Fail";
})(EUploadActions || (EUploadActions = {}));
var SaveToStore = /** @class */ (function () {
    function SaveToStore(payload) {
        this.payload = payload;
        this.type = EUploadActions.SAVE_TO_STORE;
    }
    return SaveToStore;
}());
export { SaveToStore };
var GetFiles = /** @class */ (function () {
    function GetFiles() {
        this.type = EUploadActions.GET_FILES;
    }
    return GetFiles;
}());
export { GetFiles };
var GetFilesSuccess = /** @class */ (function () {
    function GetFilesSuccess(payload) {
        this.payload = payload;
        this.type = EUploadActions.GET_FILES_SUCCESS;
    }
    return GetFilesSuccess;
}());
export { GetFilesSuccess };
var GetFilesFail = /** @class */ (function () {
    function GetFilesFail(payload) {
        this.payload = payload;
        this.type = EUploadActions.GET_FILES_FAIL;
    }
    return GetFilesFail;
}());
export { GetFilesFail };
var SubmitFiles = /** @class */ (function () {
    function SubmitFiles(payload) {
        this.payload = payload;
        this.type = EUploadActions.SUBMIT_FILES;
    }
    return SubmitFiles;
}());
export { SubmitFiles };
var SubmitFilesSuccess = /** @class */ (function () {
    function SubmitFilesSuccess(payload) {
        this.payload = payload;
        this.type = EUploadActions.SUBMIT_FILES_SUCCESS;
    }
    return SubmitFilesSuccess;
}());
export { SubmitFilesSuccess };
var SubmitFilesFail = /** @class */ (function () {
    function SubmitFilesFail(payload) {
        this.payload = payload;
        this.type = EUploadActions.SUBMIT_FILES_FAIL;
    }
    return SubmitFilesFail;
}());
export { SubmitFilesFail };
var LoadUploadedFiles = /** @class */ (function () {
    function LoadUploadedFiles(payload) {
        this.payload = payload;
        this.type = EUploadActions.LOAD_UPLOADED_FILES;
    }
    return LoadUploadedFiles;
}());
export { LoadUploadedFiles };
var LoadUploadedFilesSuccess = /** @class */ (function () {
    function LoadUploadedFilesSuccess() {
        this.type = EUploadActions.LOAD_UPLOADED_FILES_SUCCESS;
    }
    return LoadUploadedFilesSuccess;
}());
export { LoadUploadedFilesSuccess };
var LoadUploadedFilesFail = /** @class */ (function () {
    function LoadUploadedFilesFail(payload) {
        this.payload = payload;
        this.type = EUploadActions.LOAD_UPLOADED_FILES_FAIL;
    }
    return LoadUploadedFilesFail;
}());
export { LoadUploadedFilesFail };
//# sourceMappingURL=upload.actions.js.map