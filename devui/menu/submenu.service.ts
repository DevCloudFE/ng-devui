import { Injectable, inject } from '@angular/core';

@Injectable()
export class SubmenuService {
  private parentService = inject(SubmenuService, { skipSelf: true, optional: true });
  level = 1;

  constructor() {
    if (this.parentService) {
      this.level = this.parentService.level + 1;
    }
  }


}
