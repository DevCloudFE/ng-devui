import { NgModule } from '@angular/core';
import { ColorPickerComponent } from './color-picker.component';
import { ColorCubeComponent } from './color-cube/color-cube.component';
import { AdvancedColorComponent } from './advanced-color/advanced-color.component';
import { AdvancedColorPanelComponent } from './advanced-color/advanced-color-panel/advanced-color-panel.component';
import { ColorSliderComponent } from './advanced-color/color-slider/color-slider.component';
import { ColorInputComponent } from './color-input/color-input.component';
import { CommonModule } from '@angular/common';
import { DevUIModule } from 'ng-devui';
import { FormsModule } from '@angular/forms';
import { BasicColorComponent } from './basic-color/basic-color.component';
import { RecentColorComponent } from './recent-color/recent-color.component';
import { ColorPickerService } from './services/color-picker.service';

@NgModule({
    imports: [
        CommonModule,
        DevUIModule,
        FormsModule,
    ],
    exports: [
        ColorPickerComponent,
        ColorCubeComponent,
        AdvancedColorComponent,
        AdvancedColorPanelComponent,
        ColorSliderComponent,
        ColorInputComponent,
        BasicColorComponent,
        RecentColorComponent,
    ],
    declarations: [
        ColorPickerComponent,
        ColorCubeComponent,
        AdvancedColorComponent,
        AdvancedColorPanelComponent,
        ColorSliderComponent,
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
