import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule, DropDownModule, RadioModule, TabsModule, ToggleModule } from 'ng-devui';
import { CustomThemeService } from './customize-theme/custom-theme.service';
import { CustomizeThemeComponent } from './customize-theme/customize-theme.component';
import { ThemePickerComponent } from './theme-picker.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    ToggleModule,
    DropDownModule,
    RadioModule,
    TabsModule,
    ButtonModule,
  ],
  exports: [
    ThemePickerComponent,
  ],
  declarations: [
    ThemePickerComponent,
    CustomizeThemeComponent,
  ],
  providers: [
    CustomThemeService
  ],
})
export class ThemePickerModule { }
