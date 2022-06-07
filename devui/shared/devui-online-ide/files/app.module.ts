export default (componentName: string, sharedComponentName: Array<{ componentName: string; fileName: string }>): string => {
  let importStr = '';
  let componentsStr = '';
  sharedComponentName.forEach((item) => {
    importStr += `
import { ${item.componentName} } from './shared/${item.fileName}';`;
    componentsStr += `${item.componentName}, `;
  });

  return `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { DevUIModule } from "ng-devui";
import { I18nModule } from 'ng-devui/i18n';

import {
  AutoCompletePopupComponent,
  DatepickerComponent,
  DragPreviewComponent,
  DrawerComponent,
  InputNumberComponent,
  LoadingBackdropComponent,
  LoadingComponent,
  ModalComponent,
  ModalContainerComponent,
  PopoverComponent,
  ReadTipComponent,
  SelectComponent,
  StepsGuideComponent,
  ToastComponent,
  TooltipComponent,
  TreeSelectComponent
} from "ng-devui";

import { ${componentName} } from './app.component';
${importStr}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ClipboardModule,
    DevUIModule,
    I18nModule
  ],
  declarations: [ ${componentName}, ${componentsStr} ],
  entryComponents: [
    AutoCompletePopupComponent,
    DatepickerComponent,
    DragPreviewComponent,
    DrawerComponent,
    InputNumberComponent,
    LoadingBackdropComponent,
    LoadingComponent,
    ModalComponent,
    ModalContainerComponent,
    PopoverComponent,
    ReadTipComponent,
    SelectComponent,
    StepsGuideComponent,
    ToastComponent,
    TooltipComponent,
    TreeSelectComponent,
    ${componentsStr}
  ],
  bootstrap: [ ${componentName} ],
})
export class AppModule { }`;
};
