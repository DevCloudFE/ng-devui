import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ThemeService } from 'ng-devui/theme';

@Component({
  selector: 'theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
})
export class ThemePickerComponent implements OnInit {
  themeService: ThemeService;
  themes;
  theme: string;
  themeMode: 'light' | 'dark' | string = 'light';
  themePrefix = 'devui';

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.themeService = window['devuiThemeService'];
    this.themes = window['devuiThemes'];
    this.theme = window['devuiCurrentTheme'];
    this.themePrefix = this.theme.split('-')[0];
    this.themeMode = this.theme.split('-')[1];
    this.cdr.detectChanges();
  }

  themesChange(): void {
    this.theme = `${this.themePrefix}-${this.themeMode}-theme`;
    this.themeService.applyTheme(this.themes[this.theme]);
  }
}
