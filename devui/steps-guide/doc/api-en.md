# How to use

Import into module

```ts
import { StepsGuideModule } from 'ng-devui/steps-guide';
```

In the page

```html
<!-- xxx can be any elements -->
<xxx dStepsGuide></xxx>
```

# dStepsGuide

## dStepsGuide Parameter

|      Parameter       |                        Type                         | Default |                                                                                                       Description                                                                                                        | Jump to Demo                             | Global Config |
| :------------------: | :-------------------------------------------------: | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------- | ------------- |
|       pageName       |                      `string`                       |   --    |                            Required. This parameter specifies whether to display the operation guide. It is recommended that you use the same value for a group of operation guide sequences.                            | [Basic usage](demo#basic-usage)          |
|        steps         |         `Array<`[`StepItem`](#stepitem)`>`          |   []    | Required. Operation guide step array. If an operation guide step is set through StepsGuideService.setSteps, the step in the service is preferentially used. For the definition of the StepItem object, see the following | [Basic usage](demo#basic-usage)          |
|      stepIndex       |                      `number`                       |   --    |                                                                           Required. Index of the current step in the operation guide sequence.                                                                           | [Basic usage](demo#basic-usage)          |
|     beforeChange     |           `Function\|Promise\|Observable`           |   --    |                                       Optional. This function is executed before the step switchover. The boolean value is returned to determine whether to display this step.                                        | [基本用法](demo#basic-usage)             |
|     ~~position~~     | [`StepsGuidePositionType`](#stepsguidepositiontype) |   top   |       Optional. Guide the position and direction of information dragging, optional values: top, top-left, top-right, bottom, left-left, bottom-right, left, right (`deprecated, please use dStepsGuidePosition`).        | [Basic usage](demo#basic-usage)          |
| dStepsGuidePosition  | [`StepsGuidePositionType`](#stepsguidepositiontype) |   top   |                             Optional. Guide the position and direction of the information pop-up, optional values: top, top-left, top-right, bottom, bottom-left, bottom-right, left, right                              | [Basic usage](demo#basic-usage)          |
|       leftFix        |                      `number`                       |    0    |                                                                        Optional. It is used to correct the location of the guidance information.                                                                         | [Customized location](demo#custom-usage) |
|        topFix        |                      `number`                       |    0    |                                                                             Optional. Used to correct the location of guidance information.                                                                              | [Customized location](demo#custom-usage) |
|        zIndex        |                      `number`                       |  1100   |                                                                  Optional. This parameter is used to adjust the display level of guidance information.                                                                   | [Customized position](demo#custom-usage) |
|    targetElement     |                    `HTMLElement`                    |   --    |                  Optional. This parameter specifies the target dom in the instruction information. If this parameter is specified, the dom where the instruction is located is not used as the target.                   | [Customized location](demo#custom-usage) |
| scrollToTargetSwitch |                      `boolean`                      |  true   |                                                    Optional. Indicates whether to automatically scroll to the location where the guide information is displayed. dom                                                     | [Customized location](demo#custom-usage) |
|    targetElement     |                    `HTMLElement`                    |   --    |                  Optional. This parameter specifies the target dom in the instruction information. If this parameter is specified, the dom where the instruction is located is not used as the target.                   | [Customized location](demo#custom-usage) |
| scrollToTargetSwitch | `boolean` | true | Optional. Indicates whether to automatically scroll to the location where the guide information is displayed. dom | [Customized location](demo#custom-usage) |
| observerDom | `HTMLElement` | -- | Optional. Allows users to specify a dom to report page changes. This parameter is used when the location of the guide information changes due to the dom change that cannot be controlled or determined by the user and does not trigger the resize event. For example, the guide information is bound to the header menu of fixed positioning, the dom position of the header menu changes because the scroll bar is displayed or hidden when the page changes with the route. | [Customized position](demo#custom-usage) |
| extraConfig | [`ExtraConfig`](#extraconfig) | -- | Optional. Extended configuration used to hide the button and dot icon of the previous step. For details about the definition of the ExtraConfig object, see the following description. | [Customized location](demo#custom-usage) |

### StepItem

```ts
export interface StepItem {
  title: string; // guide title
  content: string; // guide content
}
```

### StepsGuidePositionType

```ts
export type StepsGuidePositionType = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'right';
```

### ExtraConfig

```ts
export interface ExtraConfig {
  hidePreStep: boolean; // Hide Previous Button
  hideStepNav: boolean; // Hide step dot icon display
}
```

### dStepsGuide Event

|   Parameter   |                          Type                           | Description                                                                                                                                             | Jump to Demo                    |
| :-----------: | :-----------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------ |
| operateChange | `EventEmitter<`[`OperateResponse`](#operateresponse)`>` | Optional. Returns the index of the current step and the current operation. For details about the OperateResponse object, see the following description. | [Basic usage](demo#basic-usage) |

# Interface & Type Definition

### OperateResponse

```ts
OperateResponse {
  currentIndex: number; // Current index
  clickType: 'prev' | 'next' | 'close'; // Current Operation
}
```
