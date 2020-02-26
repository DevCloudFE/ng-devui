import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class ColorPickerService {
  color = '';
  pureColor = '';
  updateColor = new EventEmitter<string>();
  updatePureColor = new EventEmitter<void>();
  saveRecentColor = new EventEmitter<void>();
  onRootMouseMove = new EventEmitter<MouseEvent>();
  onRootMouseUp = new EventEmitter<void>();

  constructor() { }

  getColor() {
    return this.color;
  }

  getPureColor() {
    return this.pureColor;
  }

  setColor(color, setter: string = 'normal') {
    const oldColor = this.color;
    this.color = color;
    if (oldColor !== color) {
      this.updateColor.emit(setter); // setter is who set the color
    }
  }

  setPureColor(color) {
    const oldColor = this.pureColor;
    this.pureColor = color;
    if (oldColor !== color) {
      this.updatePureColor.emit();
    }
  }
}
