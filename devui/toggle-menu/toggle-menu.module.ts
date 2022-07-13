import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { LoadingModule } from 'ng-devui/loading';
import { TagsModule } from 'ng-devui/tags';
import { HighlightModule, LazyLoadModule } from 'ng-devui/utils';
import { WindowRefModule } from 'ng-devui/window-ref';
import { ToggleMenuContainerComponent } from './toggle-menu-container.component';
import { ToggleMenuInputComponent } from './toggle-menu-input.component';
import { ToggleMenuLabelComponent } from './toggle-menu-label.component';
import { ToggleMenuListItemComponent } from './toggle-menu-list-item.component';
import { ToggleMenuListComponent } from './toggle-menu-list.component';
import { ToggleMenuOperationComponent } from './toggle-menu-operation.component';
import { ToggleMenuPlaceholderComponent } from './toggle-menu-placeholder.component';
import { ToggleMenuSearchComponent } from './toggle-menu-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CheckBoxModule,
    HighlightModule,
    LazyLoadModule,
    LoadingModule,
    OverlayModule,
    ScrollingModule,
    WindowRefModule,
    TagsModule,
  ],
  declarations: [
    ToggleMenuContainerComponent,
    ToggleMenuOperationComponent,
    ToggleMenuInputComponent,
    ToggleMenuLabelComponent,
    ToggleMenuListItemComponent,
    ToggleMenuListComponent,
    ToggleMenuPlaceholderComponent,
    ToggleMenuSearchComponent,
  ],
  exports: [
    ToggleMenuContainerComponent,
    ToggleMenuOperationComponent,
    ToggleMenuInputComponent,
    ToggleMenuLabelComponent,
    ToggleMenuListItemComponent,
    ToggleMenuListComponent,
    ToggleMenuPlaceholderComponent,
    ToggleMenuSearchComponent,
  ],
})
export class ToggleMenuModule {}
