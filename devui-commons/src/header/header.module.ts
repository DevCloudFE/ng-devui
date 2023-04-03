import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DevUIModule } from 'ng-devui';
import { SafePipeModule } from 'ng-devui/utils';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { HeaderComponent } from './header.component';
import { LanguageSwitchComponent } from './language-switch/language-switch.component';
import { LogoComponent } from './logo/logo.component';
import { MenuComponent } from './menu/menu.component';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { VersionSwitchComponent } from './version-switch/version-switch.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DevUIModule,
    SafePipeModule
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    MenuComponent,
    VersionSwitchComponent,
    ThemePickerComponent,
    ThemeSwitchComponent,
    LanguageSwitchComponent,
    EcosystemComponent
  ],
  declarations: [
    HeaderComponent,
    LogoComponent,
    MenuComponent,
    VersionSwitchComponent,
    ThemePickerComponent,
    ThemeSwitchComponent,
    LanguageSwitchComponent,
    EcosystemComponent
  ]
})
export class HeaderModule { }
