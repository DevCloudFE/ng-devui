# How to use

Import into module:

```ts
import { ReadTipModule } from 'ng-devui/read-tip';
```

In the page:

```html
<xxx dReadTip [readTipOptions]="youOptions"> ... </xxx>
```

# dReadTip

## dReadTip parameters

|      Parameter       |                Type                 | Default | Description                                  | Jump to Demo                                           |Global Config| 
| :----------------: | :------------------: | :---------------------------------: | :-----: | :------------------------------------------- | ------------------------------------------------------ |
|    readTipOptions    | [`ReadTipOptions`](#readtipoptions) |   --    | Required. Set readtip options.               | [Basic Usage](demo#basic-usage)                        |
| readTipOptions.rules |   [`ReadTipRules`](#readtiprules)   |   --    | Option. Set the content of readtip           | [Include Multiple Readtip](demo#multi-readtip)         |
|   contentTemplate    |         `TemplateRef<any>`          |   --    | Options. Using template to customize content | [Display Content with Template](demo#readtip-template) |

# Interface & Type Definition

### ReadTipOptions

```ts
export interface ReadTipOptions {
  trigger?: 'hover' | 'click'; // default is hover
  showAnimate?: boolean; // default is false
  mouseenterTime?: number; // default is 100
  mouseleaveTime?: number; // default is 100
  position?: PositionType | PositionType[]; // default is 'top'
  overlayClassName?: string; // default is ''
  appendToBody?: boolean; // defualt is true
  rules: ReadTipRules;
}
```

### ReadTipRules

```ts
export type ReadTipRules = ReadTipRule | ReadTipRule[];

export interface ReadTipRule {
  key?: string;
  selector: string;
  trigger?: 'hover' | 'click'; // can inherit from ReadTipOptions
  title?: string;
  content?: string;
  showAnimate?: boolean; // can inherit from ReadTipOptions
  mouseenterTime?: number; // can inherit from ReadTipOptions
  mouseleaveTime?: number; // can inherit from ReadTipOptions
  position?: PositionType | PositionType[]; // can inherit from ReadTipOptions
  overlayClassName?: string; // can inherit from ReadTipOptions
  appendToBody?: boolean; // can inherit from ReadTipOptions
  //customData should be used with template. The context of template is customData so that you can customize your template
  dataFn?: ({
    element,
    rule: ReadTipRule,
  }) => Observable<{ title?: string; content?: string; template?: TemplateRef<any>; customData?: any }>;
}
```
