import { IContextService } from './interface';
export class ContextService implements IContextService {
  getDataFromNameSpace(nameSpace: string) {
    return window[nameSpace];
  }
  setDataFromNameSpace(nameSpace: string, value: any) {
    window[nameSpace] = value;
  }
}
