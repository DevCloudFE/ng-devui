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
  @Output() send = new EventEmitter();
  @Output() confirm = new EventEmitter();
  recentlyUsed: Array<string> = [];

  constructor(
    private colorPickerService: ColorPickerService
  ) {
    this.colorPickerService.saveRecentColor.subscribe(
      (color) => {
        this.saveRecentlyUsed(color);
      }
    );
  }

  ngOnInit() {
    this.loadFromLocalData();
  }

  loadFromLocalData() {
    this.recentlyUsed = JSON.parse(localStorage.getItem('recentlyUsed')) || [];
  }

  saveToLocalData() {
    localStorage.setItem('recentlyUsed', JSON.stringify(this.recentlyUsed));
  }

  saveRecentlyUsed(color) {
    saveRecentColors(this.recentlyUsed, color, this.limit);
    this.saveToLocalData();
  }

  clearColor() {
    this.send.emit({color: ''});
  }

  confirmColor(color) {
    this.saveRecentlyUsed(color);
    this.confirm.emit(color);
  }
}
