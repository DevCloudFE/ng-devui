import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'ng-devui/button';
import { CheckBoxModule } from 'ng-devui/checkbox';
import { DatepickerModule } from 'ng-devui/datepicker';
import { DropDownModule } from 'ng-devui/dropdown';
import { FormModule } from 'ng-devui/form';
import { InputNumberModule } from 'ng-devui/input-number';
import { LoadingModule } from 'ng-devui/loading';
import { SearchModule } from 'ng-devui/search';
import { TagsModule } from 'ng-devui/tags';
import { TextInputModule } from 'ng-devui/text-input';
import { TreeModule } from 'ng-devui/tree';
import { PopperModule } from 'ng-devui/utils';
import { CategorySearchComponent } from './category-search.component';

@NgModule({
  declarations: [CategorySearchComponent],
  imports: [
    CommonModule,
    FormModule,
    FormsModule,
    DropDownModule,
    TextInputModule,
    SearchModule,
    TagsModule,
    TagsModule,
    DatepickerModule,
    ButtonModule,
    CheckBoxModule,
    InputNumberModule,
    LoadingModule,
    TreeModule,
    PopperModule,
  ],
  exports: [CategorySearchComponent],
})
export class CategorySearchModule {}
