import { Injectable } from '@angular/core';

@Injectable()
export class DocumentRef {

  constructor() {
  }

  get body(): any {
    return document.body;
  }

  get documentElement(): any {
    return document.documentElement;
  }
}
