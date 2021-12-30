import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'ng-devui/auto-complete';
import {PositioningModule} from 'ng-devui/position';
import { EditableSelectComponent } from './editable-select.component';

@NgModule({
  imports: [CommonModule, FormsModule, AutoCompleteModule, PositioningModule],
  exports: [EditableSelectComponent],
  declarations: [EditableSelectComponent],

})
export class EditableSelectModule {
}
