import { NgModule } from '@angular/core';
import { WindowRef } from './window-ref.service';
import { DocumentRef } from './document-ref.service';

@NgModule({
  providers: [
    WindowRef,
    DocumentRef,
  ],
})
export class WindowRefModule {
}
