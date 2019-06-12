import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { AccordionModule } from './accordion';
import { AlertModule } from './alert';
import { AnchorModule } from './anchor';
import { ButtonModule } from './button';
import { CheckBoxModule } from './checkbox';
import { AveCommonModule } from './common';
import { DataTableModule } from './data-table';
import { DatepickerModule } from './datepicker';
import { DevUIConfig } from './devui.config';
import { DragDropModule } from './dragdrop';
import { DrawerModule } from './drawer';
import { DropDownModule } from './dropdown';
import { EditableSelectModule } from './editable-select';
import { LoadingModule } from './loading';
import { ModalModule } from './modal';
import { PaginationModule } from './pagination';
import { PanelModule } from './panel';
import { PopoverModule } from './popover';
import { PositionService } from './position';
import { ProgressModule } from './progress';
import { RadioModule } from './radio';
import { SearchModule } from './search';
import { SelectModule } from './select';
import { StatusModule } from './status';
import { StickyModule } from './sticky';
import { TabsModule } from './tabs';
import { TagsInputModule } from './tags-input';
import { ToastModule } from './toast';
import { ToggleModule } from './toggle';
import { TooltipModule } from './tooltip';
import { TreeModule } from './tree';
import { UploadModule } from './upload';
import { DocumentRef } from './window-ref/document-ref.service';
import { WindowRef } from './window-ref/window-ref.service';
import { AutoCompleteModule } from './auto-complete';

export * from './accordion';
export * from './alert';
export * from './anchor';
export * from './auto-complete';
export * from './button';
export * from './checkbox';
export * from './common';
export * from './data-table';
export * from './datepicker';
export * from './dragdrop';
export * from './drawer';
export * from './dropdown';
export * from './editable-select';
export * from './loading';
export * from './modal';
export * from './pagination';
export * from './panel';
export * from './popover';
export * from './progress';
export * from './radio';
export * from './search';
export * from './select';
export * from './status';
export * from './sticky';
export * from './tabs';
export * from './tags-input';
export * from './toast';
export * from './toggle';
export * from './tooltip';
export * from './tree';
export * from './upload';
export * from './version';

@NgModule({
  imports: [],
  exports: [
    AccordionModule,
    AlertModule,
    AnchorModule,
    AutoCompleteModule,
    AveCommonModule,
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
    TagsInputModule,
    ToastModule,
    ToggleModule,
    TooltipModule,
    TreeModule,
    UploadModule
  ],
  declarations: []
})
export class DevUIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DevUIModule,
      providers: [
        { provide: DocumentRef, useClass: DocumentRef },
        { provide: WindowRef, useClass: WindowRef },
        { provide: PositionService, useClass: PositionService },
        { provide: DevUIConfig, useClass: DevUIConfig }
      ]
    };
  }
}
