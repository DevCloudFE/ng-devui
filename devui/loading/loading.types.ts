import {
  Observable
} from 'rxjs';
export type LoadingType = Observable<any> | Promise<any> | Array<Promise<any>> | Array<Observable<any>> | undefined;
