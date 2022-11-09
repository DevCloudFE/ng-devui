# How to use
Import into module:
```ts
import { UserGuideModule } from 'ng-devui/user-guide';
```

Use as a component:
```html
<d-user-guide [steps]="steps"></d-user-guide>
```

Use as a service：
```ts
import { UserGuideService } from 'ng-devui/user-guide';

constructor(private userGuideService: UserGuideService) { }

ngOnInit() {
this.userGuideService.setSteps(this.steps);
}

startTutorial(index: number) {
this.userGuideService.start(index);
}
```
# UserGuide

## d-user-guide Parameter (Component Mode)

| Parameter | Type | Default | Description | Jump to Demo |
| :---------: | :------------:  | :-----: | :---------------------------------------------------------------------------  |  :---------------------------     |
|     steps      |    `Array<IStepElement>`     |   []    | Set the user guide. Each iStep is a set of guide tutorials. | [Basic Badge](demo#badge-basic) |
|    userGuideEntrancePosition    |    `{bottom: string, left: string}`     |   `{bottom: '30px', left: '30px'}`    | Optional. Set the position of the user guide hover entrance. | [Basic Badge](demo#badge-basic) |
|     showUserGuideEntrance      |    `boolean`     |   `true`    | Optional. Indicates whether to display the user guide floating entrance. | [Basic Badge](demo#badge-basic) |

## d-user-guide public method (Service Mode)
| Method name | Parameter | Type | Description | Jump to Demo |      
| :----: | :---: | :----- | :-------: | :-------: |
|  setSteps  | steps   | `Array<IStep>`     | Setting Up Guide Tutorial Data | [Service Mode](demo#user-guide-service-way) |
|  start  |  index   | `number`     | Start a set of tutorials | [Service Mode](demo#user-guide-service-way) |
|  goStep  |  index   | `number`     | Start at a step in the current tutorial | [Service Mode](demo#user-guide-service-way) |
|  getCurrentStep  |  --   | --     | Obtain the current step. | [Service Mode](demo#user-guide-service-way) |
|  getCurrentDirection  |  --   | --  | Obtains the switching direction of the current step. The return value is `'forward' \| 'backward'` | [Service Mode](demo#user-guide-service-way) |
|  updateCurrentStepElement  |  --   | --     | Dynamically update current step element | [Service Mode](demo#user-guide-service-way) |
|  exit  |  --   | --     | Exit User Guide | [Service Mode](demo#user-guide-service-way) |
|  showDot  |  item   | `string`     | Indicates the element of the point to be displayed. The value can be a class name or an ID name. | [Service Mode](demo#user-guide-service-way) |
|  removeDot  |  item   | `string`     | The element from which the point is to be removed. The class name or id name is supported. | [Service Mode](demo#user-guide-service-way) |


### IStep A set of guided tutorials that appear in the guided list.

```TS
export interface IStep {
    title: string; // Title of this set of guidelines

    desc?: string; // Description of this set of guidelines

    showDots?: boolean; // Whether to show step points 

    maxContentWidth?: number; // Maximum width of the content area

    defaultStart?: boolean; // Whether to start this tutorial automatically after the page finishes loading

    detail: Array<IStepElement>; // Specific steps in this set of guidelines
```

### IStepElement

```TS
export interface IStepElement {
    element?: object; // Element associated with the guide step, which can be a class name or ID name.

    title: string; // Title of the guide step.

    content?: string; // Description of the guide step, which can be character strings, HTML or TemplateRef.

    position?: PositionType; // Position of the pop-up window. If this parameter is not transferred, a proper position is automatically selected.

    type: 'normal' | 'interactable'; // Guidance Mode Type
    // The default value is normal, indicating the general guidance mode. If the value of element is not undifined, locate the element and highlight the current step. The page and element cannot be clicked. If the value of element is undifined, no specific element is located, and the general information is displayed in the guide window. Other areas of the page cannot be clicked.
    // The second mode is interactive. The blue box and breathing action are used to highlight step elements. Users can click elements for dynamic interaction. The eventType parameter must be used together with the eventType parameter. Currently, three types of interaction events are provided: click event, input event, and exit event.
    // The third is the'tip' prompt box mode, which is suitable for some step-by-step instructions that highlight the user.

    eventType?: 'clickable' | 'inputable' | 'exit'; // Interactive Event Types
    // Clickable is a clickable event. After a user clicks an element, the user clicks an additional operation and proceeds to the next step. It is usually used to open a pop-up window or drop-down menu after the user clicks the element.
    // "inputable" is an inputable event. The user can click the auxiliary area of the guide window to automatically enter the event. The user can automatically enter the event or enter the information in the input box to complete the interaction and display the Next button.
    // 'exit' is an exit event that automatically closes the tutorial at the last step of the tutorial and prompts the user to complete the tutorial.

    highlightOffset?: Array<Number>;
    //Offset of the highlighted region. The format is [up, right, bottom, left]. The unit is px.

    inputData?: string; //Allows you to enter the content automatically entered by the event. This parameter is mandatory when eventType is set to inputable.

    waitingTime?: number; //Event Waiting Time

    beforeChange?: Function | Promise | Observable; // User callback function before the start of each step. If no return value is returned or the return value is true, go to the next step.

    showPrevButton?: boolean; // Whether to display the previous button
}
```

```TS
export type PositionType =  'left' | 'right' | 'top' | 'bottom' | 'bottom-left'| 'bottom-right'| 'top-left'| 'top-right'|
    'left-top'| 'left-bottom'| 'right-top'| 'right-bottom';
```