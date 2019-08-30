import {
  Type
} from '@angular/core';

export interface IExampleData {
  type?: string;
  ts?: string;
  html?: string;
  document?: string;
  api?: string;
  name: string;
  cnName?: string;
  Module: Type<any>;
  author?: string;
  description?: string;
  tmw?: string;
}

export interface IDemoConfig {
  type?: string;
  components: any;
}
