# 如何使用

在 module 中引入：

```ts
import { NavSpriteModule } from 'ng-devui/nav-sprite';
```

在页面中使用：

```html
<d-nav-sprite [target]="xxx"></d-nav-sprite>
```

# dNavSprite

## dNavSprite 参数

|         参数        |                类型                  |            默认             | 说明                            | 跳转 Demo                                    |
| :------------------:| :---------------------------------: | :-------------------------: | :------------------------------ | -------------------------------------------- |
|    target  |   `HTMLElement`                     |           --               |         必选，目录存放的位置    |         [基本用法](demo#basic)                |
|    scrollTarget         |     `HTMLElement`             |              --              |           可选，指定滚动容器            |       [指定容器用法](demo#scroll)   |
|     view      | `{top?:number,bottom?:number}` |            {top:0,bottom:0}             |     可选，用于可视区域的调整，比如顶部有固定位置的头部等，数值对应被遮挡的顶部或底部的高度     |   [指定容器用法](demo#scroll)  |
|    hashSupport         |     `boolean`             |              `false`              |           可选，是否支持锚点            |                    --  |
|    mode             |     [`SpriteMode`](#SpriteMode)            |           'default'           |          可选，模式`default \| sprite`                   |                    [精灵用法](demo#sprite)  |
|    maxLevel         |     `number`                          |           3                 |           可选，生成目录的最大层级               |                    [精灵用法](demo#sprite)  |
|    title         |     `string`                          |              'menu'              |           可选，名称               |                    [基本用法](demo#basic)  |
|    isOpen         |     `boolean`            |              true              |           可选，精灵模式下，目录默认展开           |                    -- |
|    indent         |     `number`                          |              2em              |          可选，缩进2个占位               |                    --  |
|    width         |     `number`                        |              300              |           可选，高度               |                    [精灵用法](demo#sprite)  |
|    height         |     `number`                            |              400              |           可选，宽度               |                    [精灵用法](demo#sprite)  |
|    spriteOption         |     [`SpriteOption`](#SpriteOption)     |              [`defaultOption`](#defaultOption)              |           可选，sprite模式下的导航初始位置               |  [精灵用法](demo#sprite)  |
|    navItemTemplate         |     `TemplateRef<any>`             |              --              |           可选，单条目录模板             |                    [精灵用法 ](demo#sprite)  |

## dNavSprite 事件
|         参数        |                类型                  |            默认             | 说明                            | 跳转 Demo                                    |
| :------------------:| :---------------------------------: | :-------------------------: | :------------------------------ | -------------------------------------------- |
|    afterNavInit  |   `EventEmitter<NavSpriteComponent>`    |           --               |         可选，导航精灵组件实例    |         [精灵用法](demo#sprite)                |

# 接口 & 类型定义

## SpriteMode

```ts
export type SpriteMode = 'default' | 'sprite';

```

## SpriteOption

```ts

export interface SpriteOption {
  top: string;
  left: string;
  zIndex: number;
}

```

## defaultOption

```ts

const defaultOption: SpriteOption = {
  top: '30%',
  left: '80%',
  zIndex: 1,
}

```
