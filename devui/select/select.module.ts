import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SelectComponent } from './select.component';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { DocumentRef, WindowRef } from 'ng-devui/window-ref';
import { LazyLoadDirective } from './lazy-load.directive';
import { LoadingModule } from 'ng-devui/loading';
import { I18nService } from 'ng-devui/utils';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    ScrollingModule,
    CheckBoxModule,
    LoadingModule
  ],
  exports: [
    SelectComponent,
  ],
  declarations: [
    SelectComponent,
    LazyLoadDirective
  ],
  providers: [
    WindowRef,
    DocumentRef,
    I18nService,
  ]
})
export class SelectModule { }
