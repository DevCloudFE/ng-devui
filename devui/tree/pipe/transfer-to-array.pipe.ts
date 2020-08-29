import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'transferToArrayPipe' })
export class TransferToArrayPipe implements PipeTransform {

    constructor() {
    }

    transform(number) {
        return Array(number).fill(0);
    }
}
