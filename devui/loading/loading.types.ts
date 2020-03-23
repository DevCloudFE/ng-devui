import {
  Observable, Subscription
} from 'rxjs';
export type LoadingType = Observable<any> | Promise<any> | Array<Promise<any>> | Array<Observable<any>> | Subscription | undefined;
