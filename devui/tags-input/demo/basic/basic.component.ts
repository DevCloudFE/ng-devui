import {
    Component, OnInit
} from '@angular/core';

@Component({
    selector: 'd-tags-input-basic',
    templateUrl: './basic.component.html'
  })

export class TagsInputDemoBasicComponent implements OnInit {
    tagList: any = [];
    taskTagConfig: any;
    suggestionList: any = [];
    ngOnInit() {
        this.tagList = [{ id: 1769, name: '123' }];
        this.taskTagConfig = {
            displayProperty: 'name',
            maxLength: 25,
            minLength: 1,
            maxTags: 25,
            placeholder: 'Add a tag',
            spellcheck: false,
            caseSensitivity: false,
            isAddBySpace: true
        };
        this.suggestionList = [
            { name: 'item1' },
            { name: 'item2' },
            { name: 'item3' },
            { name: 'item4' },
            { name: 'item5' },
            { name: 'item6' },
            { name: 'item7' }
        ];

    }

    customCheck = (newtag: string) => {
        return true;
    }

    getTagValue(value) {
        console.log(value);
    }
}
