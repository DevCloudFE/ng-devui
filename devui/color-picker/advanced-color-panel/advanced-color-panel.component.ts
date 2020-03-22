import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { colorToPureColor, getColorByPosition, getColorPosition } from '../utils/color';
import { Panel, Pointer } from '../utils/advanced-color.types';
import { ColorPickerService } from '../services/color-picker.service';

@Component({
  selector: 'd-advanced-color-panel',
  templateUrl: './advanced-color-panel.component.html',
  styleUrls: ['./advanced-color-panel.component.scss']
})
export class AdvancedColorPanelComponent implements OnInit {
  @Input() color;
  @Input() pureColor;
  @Output() send = new EventEmitter();
  uniqueId: string = Math.random().toString(36).substring(7);
  panel: Panel = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };
  pointer: Pointer = {
    top: 0,
    left: 0,
    color: ''
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
        this.getPureColor();
        this.initPointerPosition();
      }
    );
    this.colorPickerService.updateAdvancedPureColor.subscribe(
      () => {
        this.getColor();
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
    this.getPureColor();
    setTimeout(() => { // HACK: init the panl after dom inited.
      this.initPanel();
      this.initPointerPosition();
    }, 10);
  }

  getPureColor() {
    this.pureColor = colorToPureColor(this.color);
  }

  initPanel() {
    const panel = document.getElementsByClassName(this.uniqueId)[0] as HTMLElement;
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

  mouseClickEvent(event: MouseEvent) {
    this.pointer.left = event.clientX - this.panel.left;
    this.pointer.top = event.clientY - this.panel.top + document.documentElement.scrollTop;
    this.getColor();
  }

  mouseDownEvent() {
    this.dragging = true;
  }

  mouseMoveEvent(event: MouseEvent) {
    if (!this.dragging) {
      return;
    }
    this.pointer.left = event.clientX - this.panel.left;
    // 加上页面卷起来的高度，即得到相对页面的位置
    this.pointer.top = event.clientY - this.panel.top + document.documentElement.scrollTop;
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
    this.send.emit({color: this.color, sender: 'advanced-color-panel'});
  }

  mouseUpEvent() {
    this.dragging = false;
  }
}
