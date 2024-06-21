export var ESchoolLevel;
(function (ESchoolLevel) {
    ESchoolLevel["HIGH_SCHOOL"] = "High School";
    ESchoolLevel["COLLEGE"] = "College";
    ESchoolLevel["UNIVERSITY"] = "University";
    ESchoolLevel["MASTER"] = "Master";
})(ESchoolLevel || (ESchoolLevel = {}));
var SchoolInfo = /** @class */ (function () {
    function SchoolInfo(name, level, graduatedFlag, uploadDocumentsFlag) {
        if (name === void 0) { name = null; }
        if (level === void 0) { level = ESchoolLevel.HIGH_SCHOOL; }
        if (graduatedFlag === void 0) { graduatedFlag = true; }
        if (uploadDocumentsFlag === void 0) { uploadDocumentsFlag = true; }
        this.name = name;
        this.level = level;
        this.graduatedFlag = graduatedFlag;
        this.uploadDocumentsFlag = uploadDocumentsFlag;
    }
    return SchoolInfo;
}());
export { SchoolInfo };
var AcademicInfo = /** @class */ (function () {
    function AcademicInfo(id, schoolsAttended) {
        if (schoolsAttended === void 0) { schoolsAttended = []; }
        this.id = id;
        this.schoolsAttended = schoolsAttended;
    }
    return AcademicInfo;
}());
export { AcademicInfo };
//# sourceMappingURL=academicInfo.models.js.map