import {NgModule} from '@angular/core';
import {DocumentRef, WindowRef} from 'ng-devui/window-ref';
import {PositionService} from './positioning.service';

@NgModule({
  providers: [PositionService, DocumentRef, WindowRef]
})

export class PositioningModule {
}
