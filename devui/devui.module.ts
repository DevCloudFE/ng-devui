import { NgModule, ModuleWithProviders } from '@angular/core';
import { AccordionModule } from 'ng-devui/accordion';
import { AlertModule } from 'ng-devui/alert';
import { AnchorModule } from 'ng-devui/anchor';
import { ButtonModule } from 'ng-devui/button';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { DCommonModule } from 'ng-devui/common';
import { DataTableModule } from 'ng-devui/data-table';
import { DatepickerModule } from 'ng-devui/datepicker';
import { DragDropModule } from 'ng-devui/dragdrop';
import { DrawerModule } from 'ng-devui/drawer';
import { DropDownModule } from 'ng-devui/dropdown';
import { EditableSelectModule } from 'ng-devui/editable-select';
import { LoadingModule } from 'ng-devui/loading';
import { ModalModule } from 'ng-devui/modal';
import { PaginationModule } from 'ng-devui/pagination';
import { PanelModule } from 'ng-devui/panel';
import { PopoverModule } from 'ng-devui/popover';
import { ProgressModule } from 'ng-devui/progress';
import { RadioModule } from 'ng-devui/radio';
import { SearchModule } from 'ng-devui/search';
import { SelectModule } from 'ng-devui/select';
import { StatusModule } from 'ng-devui/status';
import { StickyModule } from 'ng-devui/sticky';
import { TabsModule } from 'ng-devui/tabs';
import { TagsModule } from 'ng-devui/tags';
import { TagsInputModule } from 'ng-devui/tags-input';
import { ToastModule } from 'ng-devui/toast';
import { ToggleModule } from 'ng-devui/toggle';
import { TooltipModule } from 'ng-devui/tooltip';
import { TreeModule } from 'ng-devui/tree';
import { UploadModule } from 'ng-devui/upload';
import { AutoCompleteModule } from 'ng-devui/auto-complete';
import { InputNumberModule } from 'ng-devui/input-number';
import { SliderModule } from 'ng-devui/slider';
import { TreeSelectModule} from 'ng-devui/tree-select';

export * from 'ng-devui/accordion';
export * from 'ng-devui/alert';
export * from 'ng-devui/anchor';
export * from 'ng-devui/auto-complete';
export * from 'ng-devui/button';
export * from 'ng-devui/checkbox';
export * from 'ng-devui/common';
export * from 'ng-devui/data-table';
export * from 'ng-devui/datepicker';
export * from 'ng-devui/dragdrop';
export * from 'ng-devui/drawer';
export * from 'ng-devui/dropdown';
export * from 'ng-devui/editable-select';
export * from 'ng-devui/loading';
export * from 'ng-devui/modal';
export * from 'ng-devui/pagination';
export * from 'ng-devui/panel';
export * from 'ng-devui/popover';
export * from 'ng-devui/progress';
export * from 'ng-devui/radio';
export * from 'ng-devui/search';
export * from 'ng-devui/select';
export * from 'ng-devui/status';
export * from 'ng-devui/sticky';
export * from 'ng-devui/tabs';
export * from 'ng-devui/tags';
export * from 'ng-devui/tags-input';
export * from 'ng-devui/toast';
export * from 'ng-devui/toggle';
export * from 'ng-devui/tooltip';
export * from 'ng-devui/tree';
export * from 'ng-devui/upload';
export * from 'ng-devui/input-number';
export * from 'ng-devui/slider';
export * from 'ng-devui/tree-select';

export * from './version';

@NgModule({
  imports: [],
  exports: [
    AccordionModule,
    AlertModule,
    AnchorModule,
    AutoCompleteModule,
    DCommonModule,
    ButtonModule,
    CheckBoxModule,
    DataTableModule,
    DatepickerModule,
    DragDropModule,
    DrawerModule,
    DropDownModule,
    EditableSelectModule,
    LoadingModule,
    ModalModule,
    PaginationModule,
    PanelModule,
    PopoverModule,
    ProgressModule,
    RadioModule,
    SearchModule,
    SelectModule,
    StatusModule,
    StickyModule,
    TabsModule,
    TagsModule,
    TagsInputModule,
    ToastModule,
    ToggleModule,
    TooltipModule,
    TreeModule,
    UploadModule,
    InputNumberModule,
    SliderModule,
    TreeSelectModule,
  ],
  declarations: []
})
export class DevUIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DevUIModule,
    };
  }
}
