import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class ColorPickerService {
  updateAdvancedColor = new EventEmitter<string>();
  updateAdvancedPureColor = new EventEmitter<string>();
  saveRecentColor = new EventEmitter<string>();
  rootMouseMoveEvent = new EventEmitter<MouseEvent>();
  rootMouseUpEvent = new EventEmitter<void>();

  constructor() { }

}
