import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
/**
 * Post Secondary Education Component
 *
 * Displaying a FormGroup for dynamically add and remove Post Secondary Education data
 */
var PostSecondaryEduComponent = /** @class */ (function () {
    function PostSecondaryEduComponent() {
        var _this = this;
        /**
         * an event emitter letting parent component when the button is clicked
         */
        this.deletePostSecondaryEdu = new EventEmitter();
        this.onDeleteClick = function () {
            _this.deletePostSecondaryEdu.emit();
        };
    }
    PostSecondaryEduComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", AbstractControl)
    ], PostSecondaryEduComponent.prototype, "group", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PostSecondaryEduComponent.prototype, "deletePostSecondaryEdu", void 0);
    PostSecondaryEduComponent = tslib_1.__decorate([
        Component({
            selector: 'app-post-secondary-edu',
            templateUrl: './post-secondary-edu.component.html',
            styleUrls: ['./post-secondary-edu.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PostSecondaryEduComponent);
    return PostSecondaryEduComponent;
}());
export { PostSecondaryEduComponent };
//# sourceMappingURL=post-secondary-edu.component.js.map