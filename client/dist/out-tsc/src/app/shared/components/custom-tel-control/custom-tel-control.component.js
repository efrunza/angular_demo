import * as tslib_1 from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, HostBinding, HostListener, Input, Optional, Self } from '@angular/core';
import { FormBuilder, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { PhoneNumber } from 'shared/models';
var CustomTelControlComponent = /** @class */ (function () {
    function CustomTelControlComponent(formBuilder, focusMonitor, elementRef, ngControl) {
        var _this = this;
        this.focusMonitor = focusMonitor;
        this.elementRef = elementRef;
        this.ngControl = ngControl;
        this._disabled = false;
        this._required = false;
        this.stateChanges = new Subject();
        this.focused = false;
        this.shouldLabelFloat = this.focused || !this.empty;
        this.id = "app-custom-tel-control-" + ++CustomTelControlComponent_1.nextId;
        this.onChange = function (_) { };
        this.phone = formBuilder.group({
            countryCode: '',
            number: ''
        });
        focusMonitor.monitor(elementRef, true).subscribe(function (origin) {
            if (_this.focused && !origin) {
                _this.onTouched();
            }
            _this.focused = !!origin;
            _this.stateChanges.next();
        });
        if (this.ngControl != null) {
            // Set the value accessor directly (instead of providing
            // NG_VALUE_ACCESSOR) to avoid running into a circular import
            this.ngControl.valueAccessor = this;
        }
    }
    CustomTelControlComponent_1 = CustomTelControlComponent;
    CustomTelControlComponent.prototype.onTouched = function () { };
    CustomTelControlComponent.prototype.updateErrorState = function () { };
    Object.defineProperty(CustomTelControlComponent.prototype, "errorState", {
        //errorState;
        get: function () {
            return this.ngControl.control.invalid === true
                ? !!this.ngControl.control
                : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomTelControlComponent.prototype, "empty", {
        get: function () {
            if (this.phone) {
                var _a = this.phone.value, number = _a.number, countryCode = _a.countryCode;
                return !number && !countryCode;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomTelControlComponent.prototype, "placeholder", {
        // Defining  placeholder as an attribute for the app-custom-tel-control element
        get: function () {
            return this._placeholder;
        },
        set: function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomTelControlComponent.prototype, "required", {
        // Defining required as an attribute for the app-custom-tel-control element
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomTelControlComponent.prototype, "disabled", {
        // Defining disabled() as an attribute for the app-custom-tel-control element
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
            this._disabled ? this.phone.disable() : this.phone.enable();
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomTelControlComponent.prototype, "value", {
        // getting and setting the value of app-custom-tel-control from its children input elements
        get: function () {
            try {
                var _a = this.phone.value, countryCode = _a.countryCode, number = _a.number;
                if (countryCode.length <= 3 &&
                    countryCode.length > 0 &&
                    number.length <= 12 &&
                    number.length > 0) {
                    return new PhoneNumber(countryCode, number);
                }
            }
            catch (e) {
                return null;
            }
        },
        set: function (tel) {
            var _a = tel || new PhoneNumber('', ''), countryCode = _a.countryCode, number = _a.number;
            this.phone.setValue({ countryCode: countryCode, number: number });
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    CustomTelControlComponent.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
        this.focusMonitor.stopMonitoring(this.elementRef);
    };
    CustomTelControlComponent.prototype.setDescribedByIds = function (ids) {
        this.describedBy = ids.join(' ');
    };
    CustomTelControlComponent.prototype.onContainerClick = function (event) {
        if (event.target.tagName.toLowerCase() !== 'input') {
            var input = this.elementRef.nativeElement.querySelector('input');
            if (input) {
                input.focus();
            }
        }
    };
    CustomTelControlComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    CustomTelControlComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CustomTelControlComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    CustomTelControlComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    CustomTelControlComponent.prototype._handleInput = function () {
        this.onChange(this.phone.value);
        this.phone.updateValueAndValidity();
    };
    CustomTelControlComponent.prototype.ngDoCheck = function () {
        if (this.ngControl) {
            this.updateErrorState();
        }
    };
    var CustomTelControlComponent_1;
    CustomTelControlComponent.nextId = 0;
    tslib_1.__decorate([
        HostBinding('class.example-floating'),
        tslib_1.__metadata("design:type", Object)
    ], CustomTelControlComponent.prototype, "shouldLabelFloat", void 0);
    tslib_1.__decorate([
        HostBinding('id'),
        tslib_1.__metadata("design:type", Object)
    ], CustomTelControlComponent.prototype, "id", void 0);
    tslib_1.__decorate([
        HostBinding('attr.aria-describedby'),
        tslib_1.__metadata("design:type", String)
    ], CustomTelControlComponent.prototype, "describedBy", void 0);
    tslib_1.__decorate([
        HostListener('focusout'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], CustomTelControlComponent.prototype, "onTouched", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], CustomTelControlComponent.prototype, "placeholder", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], CustomTelControlComponent.prototype, "required", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], CustomTelControlComponent.prototype, "disabled", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", PhoneNumber),
        tslib_1.__metadata("design:paramtypes", [PhoneNumber])
    ], CustomTelControlComponent.prototype, "value", null);
    CustomTelControlComponent = CustomTelControlComponent_1 = tslib_1.__decorate([
        Component({
            providers: [
                { provide: MatFormFieldControl, useExisting: CustomTelControlComponent_1 }
            ],
            selector: 'app-custom-tel-control',
            templateUrl: './custom-tel-control.component.html',
            styleUrls: ['./custom-tel-control.component.scss']
        }),
        tslib_1.__param(3, Optional()), tslib_1.__param(3, Self()),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            FocusMonitor,
            ElementRef,
            NgControl])
    ], CustomTelControlComponent);
    return CustomTelControlComponent;
}());
export { CustomTelControlComponent };
//# sourceMappingURL=custom-tel-control.component.js.map