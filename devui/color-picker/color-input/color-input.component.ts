import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ColorPickerService } from '../services/color-picker.service';

@Component({
  selector: 'd-color-input',
  templateUrl: './color-input.component.html',
  styleUrls: ['./color-input.component.scss']
})
export class ColorInputComponent implements OnInit {
  color: string;
  @Output() confirm = new EventEmitter();

  constructor(
    private colorPickerService: ColorPickerService
  ) {
    this.colorPickerService.updateColor.subscribe(
      () => {
        this.color = this.colorPickerService.getColor();
      }
    );
  }

  ngOnInit() {
    this.color = this.colorPickerService.getColor();
  }

  inputChange() {
    if (this.checkColor()) {
      this.colorPickerService.setColor(this.color, 'colorInput');
    }
  }

  doConfirm() {
    if (this.checkColor()) {
      this.confirm.emit(this.color);
    }
  }

  checkColor() {
    const re = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
    return re.test(this.color) || this.color.length === 0;
  }
}
