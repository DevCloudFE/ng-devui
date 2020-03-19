import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionComponent } from './accordion.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        AccordionComponent
    ],
    exports: [
        AccordionComponent
    ],
})

export class AccordionModule {}
