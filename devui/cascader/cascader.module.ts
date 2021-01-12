import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { DropDownModule,  } from 'ng-devui/dropdown';
import { SelectModule } from 'ng-devui/select';
import { TagsModule } from 'ng-devui/tags';
import { CascaderLiComponent } from './cascader-li.component';
import { CascaderComponent } from './cascader.component';

@NgModule({
  declarations: [
    CascaderComponent,
    CascaderLiComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    DropDownModule,
    TagsModule,
    CheckBoxModule
  ],
  exports: [ CascaderComponent ],
})
export class CascaderModule {}
