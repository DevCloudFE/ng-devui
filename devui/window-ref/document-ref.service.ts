import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class DocumentRef {

  constructor(@Inject(DOCUMENT) private doc: any) {
  }

  get document(): any {
    return this.doc;
  }

  get body(): any {
    return this.document.body;
  }

  get documentElement(): any {
    return this.document.documentElement;
  }
}
