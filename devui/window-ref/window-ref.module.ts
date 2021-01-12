import { NgModule } from '@angular/core';
import { DocumentRef } from './document-ref.service';
import { WindowRef } from './window-ref.service';

@NgModule({
  providers: [
    WindowRef,
    DocumentRef,
  ],
})
export class WindowRefModule {
}
