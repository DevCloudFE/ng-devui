import { IStorageService } from './interface';
export class StorageService implements IStorageService {
  tryGetLocalStorage(key: string) {
    return window.localStorage.getItem(key);
  }
  trySetLocalStorage(key: string, value: any) {
    window.localStorage.setItem(key, value);
  }
}
