import { Component, OnInit } from '@angular/core';
import { colorToPureColor, getColorByPosition, getColorPosition } from '../../utils/color';
import { ColorPickerService } from '../../services/color-picker.service';

@Component({
  selector: 'd-advanced-color-panel',
  templateUrl: './advanced-color-panel.component.html',
  styleUrls: ['./advanced-color-panel.component.scss']
})
export class AdvancedColorPanelComponent implements OnInit {
  color: string;
  pureColor: string;
  panel = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };
  pointer = {
    top: 0,
    left: 0,
    color: ''
  };
  dragging = false;

  constructor(
    private colorPickerService: ColorPickerService
  ) {
    this.colorPickerService.updateColor.subscribe(
      (setter) => {
        if (setter === 'colorInput') {
          this.color = this.colorPickerService.getColor();
          if (this.color === '') { // input cleared color
            return;
          }
          this.getPureColor();
          this.initPointerPosition();
        }
      }
    );
    this.colorPickerService.updatePureColor.subscribe(
      () => {
        this.pureColor = this.colorPickerService.getPureColor();
        this.getColor();
      }
    );
    this.colorPickerService.onRootMouseMove.subscribe(
      (event) => this.mouseMove(event)
    );
    this.colorPickerService.onRootMouseUp.subscribe(
      () => this.mouseUp()
    );
  }

  ngOnInit() {
    this.color = this.colorPickerService.getColor();
    if (this.color === '') { // make red as default
      this.color = '#ff0000';
    }
    this.getPureColor();
    this.initPanel();
    this.initPointerPosition();
  }

  getPureColor() {
    this.pureColor = colorToPureColor(this.color);
  }

  initPanel() {
    const panel = document.getElementsByClassName('advanced-color-panel')[0] as HTMLElement;
    let top = panel.offsetTop;
    let left = panel.offsetLeft;
    let parent = panel;
    while ((parent = parent.offsetParent as HTMLElement)) {
      top += parent.offsetTop;
      left += parent.offsetLeft;
      if (parent === document.body as HTMLElement) {
        break;
      }
    }
    this.panel = {
      top,
      left,
      width: panel.offsetWidth,
      height: panel.offsetHeight
    };
  }

  initPointerPosition() {
    const position = getColorPosition(this.color);
    this.pointer.left = position.x * this.panel.width;
    this.pointer.top = position.y * this.panel.height;
  }

  mouseClick(event: MouseEvent) {
    this.pointer.left = event.clientX - this.panel.left;
    this.pointer.top = event.clientY - this.panel.top;
    this.getColor();
  }

  mouseDown() {
    this.dragging = true;
  }

  mouseMove(event: MouseEvent) {
    if (!this.dragging) {
      return;
    }
    this.pointer.left = event.clientX - this.panel.left;
    this.pointer.top = event.clientY - this.panel.top;
    // Edge detection
    if (this.pointer.left < 0) {
      this.pointer.left = 0;
    }
    if (this.pointer.left > this.panel.width) {
      this.pointer.left = this.panel.width;
    }
    if (this.pointer.top < 0) {
      this.pointer.top = 0;
    }
    if (this.pointer.top > this.panel.height) {
      this.pointer.top = this.panel.height;
    }
    this.getColor();
  }

  getColor() {
    this.color = getColorByPosition(this.pureColor, this.pointer.left / this.panel.width, this.pointer.top / this.panel.height);
    this.colorPickerService.setColor(this.color);
  }

  mouseUp() {
    this.dragging = false;
  }
}
