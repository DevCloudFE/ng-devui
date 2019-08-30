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
import {SafePipeModule} from 'ng-devui/utils';

@NgModule({
  imports: [CommonModule, FormsModule, LoadingModule, CheckBoxModule, PopoverModule, SafePipeModule],
  exports: [TreeComponent, TreeNodesComponent, OperableTreeComponent],
  declarations: [TreeComponent, TreeNodesComponent, OperableTreeComponent, AutofocusDirective],
  providers: [],
})
export class TreeModule {
}
