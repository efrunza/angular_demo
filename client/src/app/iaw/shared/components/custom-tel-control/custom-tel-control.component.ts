import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Optional,
  Self
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NgControl
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { PhoneNumber } from '../../../models';
import { CanUpdateErrorState, ErrorStateMatcher } from '@angular/material/core';

@Component({
  providers: [
    { provide: MatFormFieldControl, useExisting: CustomTelControlComponent }
  ],
  selector: 'app-custom-tel-control',
  templateUrl: './custom-tel-control.component.html',
  styleUrls: ['./custom-tel-control.component.scss']
})
export class CustomTelControlComponent
  implements
  ControlValueAccessor,
  MatFormFieldControl<PhoneNumber>,
  OnDestroy,
  CanUpdateErrorState,
  DoCheck {
  static nextId = 0;

  private _disabled = false;
  private _placeholder: string;
  private _required = false;

  errorStateMatcher: ErrorStateMatcher;
  phone: FormGroup;
  stateChanges: Subject<void> = new Subject();
  focused = false;
  @HostBinding('class.example-floating') shouldLabelFloat =
    this.focused || !this.empty;
  @HostBinding('id')
  id = `app-custom-tel-control-${++CustomTelControlComponent.nextId}`;
  @HostBinding('attr.aria-describedby') describedBy: string;

  @HostListener('focusout') onTouched() { }

  updateErrorState(): void { }

  //errorState;
  get errorState(): boolean {
    return this.ngControl.control.invalid === true
      ? !!this.ngControl.control
      : false;
  }

  onChange = (_: any) => { };

  get empty(): boolean {
    if (this.phone) {
      const {
        value: { number, countryCode }
      } = this.phone;

      return !number && !countryCode;
    }
    return false;
  }

  // Defining  placeholder as an attribute for the app-custom-tel-control element
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  // Defining required as an attribute for the app-custom-tel-control element
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  // Defining disabled() as an attribute for the app-custom-tel-control element
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.phone.disable() : this.phone.enable();
    this.stateChanges.next();
  }

  // getting and setting the value of app-custom-tel-control from its children input elements
  @Input()
  get value(): PhoneNumber | null {
    try {
      const {
        value: { countryCode, number }
      } = this.phone;
      if (
        countryCode.length <= 3 &&
        countryCode.length > 0 &&
        number.length <= 12 &&
        number.length > 0
      ) {
        return new PhoneNumber(countryCode, number);
      }
    } catch (e) {
      return null;
    }
  }
  set value(tel: PhoneNumber | null) {
    const { countryCode, number } = tel || new PhoneNumber('', '');
    this.phone.setValue({ countryCode, number });
    this.stateChanges.next();
  }

  constructor(
    formBuilder: FormBuilder,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.phone = formBuilder.group({
      countryCode: '',
      number: ''
    });

    focusMonitor.monitor(elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      // Set the value accessor directly (instead of providing
      // NG_VALUE_ACCESSOR) to avoid running into a circular import
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      const input = this.elementRef.nativeElement.querySelector('input');
      if (input) {
        input.focus();
      }
    }
  }

  writeValue(value: PhoneNumber | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    this.onChange(this.phone.value);
    this.phone.updateValueAndValidity();
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }
}
