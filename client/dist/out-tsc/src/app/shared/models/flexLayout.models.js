var FlexAPI = /** @class */ (function () {
    function FlexAPI(matCard, formContainer, formRow, matCardHeader, matCardContent, matFormFieldContainer, matCardActions) {
        if (matCard === void 0) { matCard = {
            fxLayout: 'column',
            fxLayoutAlign: 'center'
        }; }
        if (formContainer === void 0) { formContainer = {
            fxLayout: 'row wrap',
            fxLayoutAlign: 'center start'
        }; }
        if (formRow === void 0) { formRow = {
            fxLayout: 'row',
            fxLayoutAlign: 'center',
            fxFlex: '100%'
        }; }
        if (matCardHeader === void 0) { matCardHeader = {
            fxLayout: 'row',
            fxLayoutAlign: 'start center',
            fxLayoutGap: '2em',
            fxFlex: 'calc(100% + 32px)'
        }; }
        if (matCardContent === void 0) { matCardContent = {
            fxLayout: 'column',
            fxLayoutAlign: 'start start',
            fxLayoutGap: '1em',
            fxFlex: '85%',
            fxFlexLtMd: '95%'
        }; }
        if (matFormFieldContainer === void 0) { matFormFieldContainer = {
            fxLayout: 'column',
            fxLayoutGap: '0.5em',
            fxFlex: '100%'
        }; }
        if (matCardActions === void 0) { matCardActions = {
            fxLayout: 'row',
            fxLayoutAlign: 'space-between center',
            fxFlex: 'grow'
        }; }
        this.matCard = matCard;
        this.formContainer = formContainer;
        this.formRow = formRow;
        this.matCardHeader = matCardHeader;
        this.matCardContent = matCardContent;
        this.matFormFieldContainer = matFormFieldContainer;
        this.matCardActions = matCardActions;
    }
    return FlexAPI;
}());
export { FlexAPI };
//# sourceMappingURL=flexLayout.models.js.map