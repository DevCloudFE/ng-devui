import { Injectable } from '@angular/core';

@Injectable()
export class DatePickerConfigService {
  dateConfig = {
    timePicker: false,
    dateConverter: null,
    min: 1900,
    max: 2099,
    format: {
      date: 'y/MM/dd',
      time: 'y/MM/dd HH:mm:ss'
    }
  };

  defaultFormat = 'y/MM/dd';
}
