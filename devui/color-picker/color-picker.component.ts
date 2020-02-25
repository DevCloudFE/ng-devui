import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ColorPickerService } from './services/color-picker.service';

@Component({
  selector: 'd-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  @Input() hide = false;
  @Input() color = '';
  @Output() cancel = new EventEmitter();
  @Output() send = new EventEmitter();
  @Output() confirm = new EventEmitter();
  showDefault = false;
  selectedPanel = 'basic';
  basicColors: Array<string> = ['#ffffff', '#ffd7d5', '#ffdaa9', '#fffed5',
    '#d4fa00', '#73fcd6', '#a5c8ff', '#ffacd5', '#ff7faa', '#d6d6d6',
    '#ffacaa', '#ffb995', '#fffb00', '#73fa79', '#00fcff', '#78acfe',
    '#d84fa9', '#ff4f79', '#b2b2b2', '#d7aba9', '#ff6827', '#ffda51',
    '#00d100', '#00d5ff', '#0080ff', '#ac39ff', '#ff2941', '#888888',
    '#7a4442', '#ff4c00', '#ffa900', '#3da742', '#3daad6', '#0052ff',
    '#7a4fd6', '#d92142', '#000000', '#7b0c00', '#ff4c41', '#d6a841',
    '#407600', '#007aaa', '#021eaa', '#797baa', '#ab1942'];

  constructor(
    private colorPickerService: ColorPickerService
  ) {
    this.colorPickerService.updateColor.subscribe(
      () => {
        this.color = this.colorPickerService.getColor();
        this.send.emit(this.color);
      }
    );
  }

  ngOnInit() {
    this.showDefault = !this.hide; // when there is an input, the hide could be init as true, so show default
    this.colorPickerService.setColor(this.color);
  }

  selectPanel(panel) {
    this.selectedPanel = panel;
  }

  mouseMove(event: MouseEvent) {
    this.colorPickerService.onRootMouseMove.emit(event);
  }

  mouseUp() {
    this.colorPickerService.onRootMouseUp.emit();
  }

  doConfirm() {
    this.colorPickerService.saveRecentColor.emit();
    this.confirm.emit(this.color);
  }
}
