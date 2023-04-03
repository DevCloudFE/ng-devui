import { IStorageService } from './interface';
export class StorageService implements IStorageService {
  tryGetLocalStorage(key: string) {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.localStorage.getItem(key);
  }
  trySetLocalStorage(key: string, value: any) {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(key, value);
  }
}
