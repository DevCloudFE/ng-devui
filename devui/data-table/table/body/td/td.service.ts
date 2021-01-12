import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class TableTdService {
  tableCellClickEvent = new EventEmitter<Event>();
  constructor() { }
}
