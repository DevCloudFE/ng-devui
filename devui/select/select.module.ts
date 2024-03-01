import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { LoadingModule } from 'ng-devui/loading';
import { TagsModule } from 'ng-devui/tags';
import { LazyLoadModule } from 'ng-devui/utils';
import { WindowRefModule } from 'ng-devui/window-ref';
import { BeforeCheckboxChangePipe } from './before-checkbox-change.pipe';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    ScrollingModule,
    CheckBoxModule,
    LoadingModule,
    LazyLoadModule,
    WindowRefModule,
    TagsModule,
  ],
  exports: [SelectComponent],
  declarations: [SelectComponent, BeforeCheckboxChangePipe],
})
export class SelectModule {}
