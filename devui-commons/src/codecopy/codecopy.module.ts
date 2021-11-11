import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CodeCopyDirective } from './codecopy.directive';

@NgModule({
  imports: [CommonModule],
  exports: [CodeCopyDirective],
  declarations: [CodeCopyDirective],
})
export class CodeCopyModule {}
