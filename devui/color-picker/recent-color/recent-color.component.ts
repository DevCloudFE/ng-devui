import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { saveRecentColors } from '../utils/color';
import { ColorPickerService } from '../services/color-picker.service';

@Component({
  selector: 'd-recent-color',
  templateUrl: './recent-color.component.html',
  styleUrls: ['./recent-color.component.scss']
})
export class RecentColorComponent implements OnInit {
  color: string;
  @Input() limit: number;
  @Output() confirm = new EventEmitter();
  recentlyUsed: Array<string> = [];

  constructor(
    private colorPickerService: ColorPickerService
  ) {
    this.colorPickerService.updateColor.subscribe(
      () => {
        this.color = this.colorPickerService.getColor();
      }
    );
    this.colorPickerService.saveRecentColor.subscribe(
      () => {
        this.saveRecentlyUsed();
      }
    );
  }

  ngOnInit() {
    this.loadFromLocalData();
    this.color = this.colorPickerService.getColor();
  }

  loadFromLocalData() {
    this.recentlyUsed = JSON.parse(localStorage.getItem('recentlyUsed')) || [];
  }

  saveToLocalData() {
    localStorage.setItem('recentlyUsed', JSON.stringify(this.recentlyUsed));
  }

  saveRecentlyUsed() {
    saveRecentColors(this.recentlyUsed, this.color, this.limit);
    this.saveToLocalData();
  }

  clearColor() {
    this.colorPickerService.setColor('');
  }

  doConfirm(color) {
    this.colorPickerService.setColor(color);
    this.saveRecentlyUsed();
    this.confirm.emit();
  }
}
