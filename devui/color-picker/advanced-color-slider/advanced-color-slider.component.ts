import { Component, OnInit } from '@angular/core';
import { colorToPureColor, getColorByPointerPositionInSlider, getPointerPositionInSliderByColor } from '../utils/color';
import { Panel, Pointer } from '../utils/advanced-color.types';
import { ColorPickerService } from '../services/color-picker.service';

@Component({
  selector: 'd-advanced-color-slider',
  templateUrl: './advanced-color-slider.component.html',
  styleUrls: ['./advanced-color-slider.component.scss']
})
export class AdvancedColorSliderComponent implements OnInit {
  color: string;
  panel: Panel = {
    top: 0,
    height: 0
  };
  pointer: Pointer = {
    top: 0,
    color: '#fff'
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
          this.initPointerPosition();
        }
      }
    );
    this.colorPickerService.rootMouseMoveEvent.subscribe(
      (event) => this.mouseMoveEvent(event)
    );
    this.colorPickerService.rootMouseUpEvent.subscribe(
      () => this.mouseUpEvent()
    );
  }

  ngOnInit() {
    this.color = this.colorPickerService.getColor();
    if (this.color === '') { // make red as default
      this.color = '#ff0000';
    }
    this.initPanel();
    this.initPointerPosition();
  }

  initPanel() {
    const panel = document.getElementsByClassName('color-slider')[0] as HTMLElement;
    if (panel === undefined) { // color changed not in basic panel
      return;
    }
    let top = panel.offsetTop; // before the advanced panel pointer drags, it contains the height of itself
    let parent = panel;
    while ((parent = parent.offsetParent as HTMLElement)) {
      top += parent.offsetTop;
      if (parent === document.body as HTMLElement) {
        break;
      }
    }
    this.panel = {
      top,
      height: panel.offsetHeight
    };
  }

  initPointerPosition() {
    const position = getPointerPositionInSliderByColor(colorToPureColor(this.color));
    this.pointer.top = position * this.panel.height;
  }

  mouseClickEvent(event: MouseEvent) {
    this.pointer.top = event.clientY - this.panel.top;
    this.getPureColor();
  }

  mouseDownEvent() {
    this.dragging = true;
  }

  mouseMoveEvent(event: MouseEvent) {
    if (!this.dragging) {
      return;
    }
    this.pointer.top = event.clientY - this.panel.top;
    // Edge detection
    if (this.pointer.top < 0) {
      this.pointer.top = 0;
    }
    if (this.pointer.top > this.panel.height) {
      this.pointer.top = this.panel.height;
    }
    this.getPureColor();
  }

  getPureColor() {
    const pureColor = getColorByPointerPositionInSlider(this.pointer.top / this.panel.height);
    this.colorPickerService.setPureColor(pureColor);
  }

  mouseUpEvent() {
    this.dragging = false;
  }
}
