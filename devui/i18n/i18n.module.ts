import { NgModule } from '@angular/core';
import { I18nDatePipe } from './i18n-date.pipe';

@NgModule({
    declarations: [
      I18nDatePipe
    ],
    exports: [
      I18nDatePipe
    ]
})
export class I18nModule {

}
