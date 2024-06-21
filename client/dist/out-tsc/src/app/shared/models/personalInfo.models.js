var PersonalInfo = /** @class */ (function () {
    function PersonalInfo() {
        this.isPreviousStudent = false;
        this.previousStudentID = null;
        this.title = null;
        this.surName = null;
        this.firstName = null;
        this.otherNames = null;
        this.gender = null;
        this.dob = null;
        this.email = null;
        this.countryOB = null;
        this.countryOC = null;
        this.countryOA = null;
        this.primaryLang = null;
        this.permanentAddress = {
            country: null,
            province: null,
            city: null,
            stAddress: null,
            stAddress2: null,
            zipCode: null,
            phone: {
                countryCode: null,
                number: null
            },
            cell: {
                countryCode: null,
                number: null
            }
        };
        this.currAddrSameAsPerm = false;
        this.mailingAddress = {
            country: null,
            province: null,
            city: null,
            stAddress: null,
            stAddress2: null,
            zipCode: null
        };
    }
    return PersonalInfo;
}());
export { PersonalInfo };
//# sourceMappingURL=personalInfo.models.js.map