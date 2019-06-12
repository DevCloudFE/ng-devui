import {
    Component, OnInit
} from '@angular/core';

@Component({
    selector: 'ave-tags-input-basic',
    templateUrl: './basic.component.html'
  })

export class TagsInputDemoBasicComponent implements OnInit {
    tagList: any = [];
    taskTagConfig: any;
    suggestionList: any = [];
    ngOnInit() {
        this.tagList = [{ id: 918, name: '11111' }, { id: 1769, name: '123' }];
        this.taskTagConfig = {
            displayProperty: 'name',
            maxLength: 25,
            maxTags: 25,
            minLength: 1,
            minTags: 0,
            placeholder: '添加一个标签',
            spellcheck: true
        };
        setTimeout(() => {
            this.suggestionList = [
                { name: 'item1' },
                { name: 'item2' },
                { name: 'item3' },
                { name: 'item4' },
                { name: 'item5' },
                { name: 'item6' },
                { name: 'item7' },
                { id: 918, name: '11111' }
            ];
        }, 1000);
    }

    customCheck = (newtag: string) => {
        return true;
    }

    getTagValue(value) {
        console.log(value);
    }
}
