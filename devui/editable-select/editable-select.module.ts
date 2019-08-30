import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableSelectComponent } from './editable-select.component';
import { AutoCompleteModule } from 'ng-devui/auto-complete';
import {PositioningModule} from 'ng-devui/position';

@NgModule({
  imports: [CommonModule, FormsModule, AutoCompleteModule, PositioningModule],
  exports: [EditableSelectComponent],
  declarations: [EditableSelectComponent],
  entryComponents: [EditableSelectComponent]
})
export class EditableSelectModule {
}
