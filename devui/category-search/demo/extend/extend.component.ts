import { AfterViewInit, Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { CategorySearchComponent, ICategorySearchTagItem } from 'ng-devui/category-search';
import { SelectComponent } from 'ng-devui/select';
import { cloneDeep } from 'lodash-es';
import { demoData } from '../demo-data';

@Component({
    selector: 'd-extend',
    templateUrl: './extend.component.html',
    styleUrls: ['./extend.component.scss'],
    standalone: false
})
export class ExtendComponent implements AfterViewInit {
  @ViewChild('extendTemplate') extendTemplate: TemplateRef<any>;
  @ViewChild('dCategorySearch') dCategorySearch: CategorySearchComponent;
  @ViewChildren(SelectComponent) dSelects: QueryList<SelectComponent>;
  dataForCreator: any;
  category: ICategorySearchTagItem[] = cloneDeep([demoData[0]]);
  statusOptionsBak = cloneDeep(demoData[0].options);
  defaultSearchField = ['status'];
  selectedTags: ICategorySearchTagItem[] = [
    {
      label: 'status',
      field: 'status',
      type: 'radio',
      value: {
        status: 'developing',
        value: 'developing',
      },
    },
  ];
  finalSearchItems: any;
  finalSearchKey: any;
  extendedConfig = {
    show: true,
    save: { disabled: false },
    customTemplate: undefined,
  };
  textConfig = {
    createFilter: '自定义过滤器',
    filterTitle: '自定义过滤器标题',
    noCategoriesAvailable: '自定义无可用分类',
  };
  showSearchCategory = {
    keyword: false,
    fieldDescription: (label: string) => `添加至 ${label} `,
    category: false,
  };

  ngAfterViewInit() {
    /* 对象或数组参数的属性改变无法触发 ngOnChange，需手动调用 setExtendedConfig 更新 */
    setTimeout(() => {
      this.extendedConfig.customTemplate = this.extendTemplate;
      this.dCategorySearch.setExtendedConfig();
    });
  }

  searchEvent(event) {
    const { selectedTags, searchKey } = event;
    this.finalSearchItems = selectedTags || {};
    this.finalSearchKey = searchKey || '';
    if (searchKey) {
      /* dateRange | numberRange | treeSelect 以上三种值为数组类型不支持直接输入值 */
      this.dCategorySearch.searchCategory(this.category[0], searchKey);
    }
  }

  selectedTagsChange(event) {
    const { currentChangeTag, operation, selectedTags } = event;
    this.finalSearchItems = selectedTags || {};
    /* 允许用户输入后添加新选项 */
    const tag = operation === 'add' && currentChangeTag;
    const option = tag?.field === 'status' && tag.value?.value;
    const optionIndex = option && tag.options.findIndex((item) => item.status === option.status);
    if (optionIndex === -1) {
      tag.options.push(option);
    }
    /* 当包含新选项禁用保存过滤器 */
    const selectedStatus = this.selectedTags.find((item) => item.field === 'status');
    if (selectedStatus?.options.length > this.statusOptionsBak.length) {
      this.extendedConfig.save.disabled = true;
      this.dCategorySearch.setExtendedConfig();
    }
  }

  reset() {
    /* 移除用户输入的新选项 */
    const resetOptions = cloneDeep(this.statusOptionsBak);
    this.category[0].options = resetOptions;
    /* 重置选中值为developing */
    this.dCategorySearch.searchCategory(this.category[0], resetOptions[1].status);
    /* 解除保存按钮的禁用状态 */
    this.extendedConfig.save.disabled = false;
    this.dCategorySearch.setExtendedConfig();
  }
}
