import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckBoxModule } from '../checkbox';
import { LoadingModule } from '../loading';
import { PopoverModule } from '../popover';
import { AutofocusDirective } from './auto-focus.directive';
import { OperableTreeComponent } from './operable-tree.component';
import { TreeNodesComponent } from './tree-nodes.component';
import { TreeComponent } from './tree.component';


@NgModule({
  imports: [CommonModule, FormsModule, LoadingModule, CheckBoxModule, PopoverModule],
  exports: [TreeComponent, TreeNodesComponent, OperableTreeComponent],
  declarations: [TreeComponent, TreeNodesComponent, OperableTreeComponent, AutofocusDirective],
  providers: [],
})
export class TreeModule {
}
