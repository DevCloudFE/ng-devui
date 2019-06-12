import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { CheckBoxModule } from '../checkbox';
import { DocumentRef } from '../window-ref/document-ref.service';
import { WindowRef } from '../window-ref/window-ref.service';
import { LazyLoadDirective } from './lazy-load.directive';
import { LoadingModule } from '../loading';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    DocumentRef
  ]
})
export class SelectModule {}
