import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ColorPickerComponent } from './color-picker.component';
import { ColorCubeComponent } from './color-cube/color-cube.component';
import { AdvancedColorPanelComponent } from './advanced-color-panel/advanced-color-panel.component';
import { AdvancedColorSliderComponent } from './advanced-color-slider/advanced-color-slider.component';
import { ColorInputComponent } from './color-input/color-input.component';
import { BasicColorComponent } from './basic-color/basic-color.component';
import { RecentColorComponent } from './recent-color/recent-color.component';
import { ColorPickerService } from './services/color-picker.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        ColorPickerComponent,
        ColorCubeComponent,
        AdvancedColorPanelComponent,
        AdvancedColorSliderComponent,
        ColorInputComponent,
        BasicColorComponent,
        RecentColorComponent,
    ],
    declarations: [
        ColorPickerComponent,
        ColorCubeComponent,
        AdvancedColorPanelComponent,
        AdvancedColorSliderComponent,
        ColorInputComponent,
        BasicColorComponent,
        RecentColorComponent,
    ],
    providers: [
        ColorPickerService,
    ],
})
export class ColorPickerModule {
}
