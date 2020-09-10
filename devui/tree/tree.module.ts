import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { LoadingModule } from 'ng-devui/loading';
import { OperableTreeComponent } from './operable-tree.component';
import { TreeNodesComponent } from './tree-nodes.component';

import { TreeComponent } from './tree.component';
import { AutofocusDirective } from './auto-focus.directive';
import { PopoverModule } from 'ng-devui/popover';
import { SafePipeModule, HighlightModule} from 'ng-devui/utils';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FilterNodesPipe } from './pipe/filter-nodes.pipe';
import { TransferToArrayPipe } from './pipe/transfer-to-array.pipe';



@NgModule({
  imports: [CommonModule, FormsModule, LoadingModule, CheckBoxModule, PopoverModule, SafePipeModule, HighlightModule, ScrollingModule],
  exports: [TreeComponent, TreeNodesComponent, OperableTreeComponent],
  declarations: [TreeComponent, TreeNodesComponent, OperableTreeComponent, AutofocusDirective, FilterNodesPipe, TransferToArrayPipe],
  providers: [],
})
export class TreeModule {
}
