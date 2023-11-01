import { NgModule } from '@angular/core';
import { StrTplOutletDirective } from './str-tpl-outlet.directive';

@NgModule({
  declarations: [StrTplOutletDirective],
  exports: [StrTplOutletDirective]
  })
export class StrTplOutletModule { }
