export interface IStorageService {
  tryGetLocalStorage(key: string): any;
  trySetLocalStorage(key: string, value: any): void;
}

export interface IContextService {
  getDataFromNameSpace(nameSpace: string): any;
  setDataFromNameSpace(nameSpace: string, value: any): any;
}

export interface IEventBus {
  add(eventName: string, callbacks: Function): void;
  remove(eventName: string, callbacks: Function): void;
  trigger(eventName: string, data: any): void;
}
