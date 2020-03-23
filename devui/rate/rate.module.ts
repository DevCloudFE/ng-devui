import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RateComponent } from './rate.component';




@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [RateComponent],
    declarations: [RateComponent],
    providers: [],
})
export class RateModule { }
