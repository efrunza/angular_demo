import { NativeDateAdapter } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
/**
 * to customized date picker to display 'YYYY/MM'
 */
export class YearMonthDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    return `${date.getFullYear()} / ${date.getMonth() + 1}`;
  }
}
