import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DropDownModule, RadioModule, TabsModule, ToggleModule } from 'ng-devui';
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
    TabsModule
  ],
  exports: [
    ThemePickerComponent,
  ],
  declarations: [
    ThemePickerComponent,
  ],
  providers: [
  ],
})
export class ThemePickerModule { }
