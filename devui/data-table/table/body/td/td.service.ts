import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class TableTdService {
  tableCellClickEvent = new EventEmitter<Event>();
  constructor() { }
}
