import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { LoadingModule } from 'ng-devui/loading';
import { DocumentRef, WindowRef } from 'ng-devui/window-ref';
import { SelectComponent } from './select.component';
import { LazyLoadModule } from 'ng-devui/utils';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    ScrollingModule,
    CheckBoxModule,
    LoadingModule,
    LazyLoadModule
  ],
  exports: [
    SelectComponent,
  ],
  declarations: [
    SelectComponent
  ],
  providers: [
    WindowRef,
    DocumentRef,
  ]
})
export class SelectModule { }
