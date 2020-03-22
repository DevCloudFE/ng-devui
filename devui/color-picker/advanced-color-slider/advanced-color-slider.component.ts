import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { colorToPureColor, getColorByPointerPositionInSlider, getPointerPositionInSliderByColor } from '../utils/color';
import { Panel, Pointer } from '../utils/advanced-color.types';
import { ColorPickerService } from '../services/color-picker.service';

@Component({
  selector: 'd-advanced-color-slider',
  templateUrl: './advanced-color-slider.component.html',
  styleUrls: ['./advanced-color-slider.component.scss']
})
export class AdvancedColorSliderComponent implements OnInit {
  @Input() color = '#ff0000';
  @Output() send = new EventEmitter();
  uniqueId: string = Math.random().toString(36).substring(7);
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
    this.colorPickerService.updateAdvancedColor.subscribe(
      (color) => {
        this.color = color;
        if (this.color === '') { // input cleared color
          return;
        }
        this.initPointerPosition();
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
    if (this.color === '') { // make red as default
      this.color = '#ff0000';
    }
    setTimeout(() => { // HACK: init the panl after dom inited.
      this.initPanel();
      this.initPointerPosition();
    }, 10);
  }

  initPanel() {
    const panel = document.getElementsByClassName(this.uniqueId)[0] as HTMLElement;
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
    this.pointer.top = event.clientY - this.panel.top + document.documentElement.scrollTop;
    this.getPureColor();
  }

  mouseDownEvent() {
    this.dragging = true;
  }

  mouseMoveEvent(event: MouseEvent) {
    if (!this.dragging) {
      return;
    }
    // 加上页面卷起来的高度，即得到相对页面的位置
    this.pointer.top = event.clientY - this.panel.top + document.documentElement.scrollTop;
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
    this.send.emit({pureColor});
  }

  mouseUpEvent() {
    this.dragging = false;
  }
}
