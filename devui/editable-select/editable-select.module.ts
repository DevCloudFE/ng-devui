import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableSelectComponent } from './editable-select.component';
import { PositionService } from '../position';
// import { WindowRef, DocumentRef } from '../window-ref';

import { AutoCompleteModule } from '../auto-complete';

@NgModule({
  imports: [CommonModule, FormsModule, AutoCompleteModule],
  exports: [EditableSelectComponent],
  declarations: [EditableSelectComponent],
  providers: [PositionService],
  entryComponents: [EditableSelectComponent]
})
export class EditableSelectModule {
}
