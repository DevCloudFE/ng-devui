import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightComponent } from './highlight.component';


@NgModule({
    imports: [CommonModule],
    declarations: [HighlightComponent],
    exports: [HighlightComponent]
})
export class HighlightModule { }
