import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { LoadingModule } from 'ng-devui/loading';
import { OperableTreeComponent } from './operable-tree.component';
import { TreeNodesComponent } from './tree-nodes.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { PopoverModule } from 'ng-devui/popover';
import { HighlightComponent, SafePipe} from 'ng-devui/utils';
import { AutofocusDirective } from './auto-focus.directive';
import { FilterNodesPipe } from './pipe/filter-nodes.pipe';
import { TransferToArrayPipe } from './pipe/transfer-to-array.pipe';
import { TreeComponent } from './tree.component';

@NgModule({
  imports: [CommonModule, FormsModule, LoadingModule, CheckBoxModule, PopoverModule, SafePipe, HighlightComponent, ScrollingModule],
  exports: [TreeComponent, TreeNodesComponent, OperableTreeComponent],
  declarations: [TreeComponent, TreeNodesComponent, OperableTreeComponent, AutofocusDirective, FilterNodesPipe, TransferToArrayPipe],
  providers: [],
})
export class TreeModule {
}
