import { Provider, Type } from '@angular/core';
import { DocumentRef } from './document-ref.service';
import { WindowRef } from './window-ref.service';

export const COMMON_SERVICES: Provider[] = [
  { provide: DocumentRef, useClass: DocumentRef },
  { provide: WindowRef, useClass: WindowRef }
];
// export * from './window-ref.service';
// export * from './document-ref.service';



