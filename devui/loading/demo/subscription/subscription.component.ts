import {
    Component
} from '@angular/core';
import { of } from 'rxjs';

import { delay } from 'rxjs/operators';
import { LoadingType } from 'ng-devui/loading';



@Component({
    selector: 'd-subscription',
    templateUrl: './subscription.component.html',
})
export class SubscriptionComponent {
    loading: LoadingType;
    source = of(1, 2, 3, 4, 5);
    constructor() {
        this.loading = undefined;
    }

    startLoading() {
        this.loading = this.source.pipe(delay(2000)).subscribe(value => {
            console.log(value);
        });
    }
}
