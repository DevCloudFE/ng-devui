import { Injectable } from '@angular/core';
import { DragSyncDirective } from '../directives/drag-sync.directive';
import { DescendantRegisterService } from './drag-drop-desc-reg.service';
import { DropSortSyncDirective } from '../directives/drop-sort-sync.directive';

@Injectable()
export class DragSyncDescendantRegisterService extends DescendantRegisterService<DragSyncDirective> {}
@Injectable()
export class DropSortSyncDescendantRegisterService extends DescendantRegisterService<DropSortSyncDirective> {}
