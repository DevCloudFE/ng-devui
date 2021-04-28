# How to use

Import into module:：

```ts
import { NavSpriteModule } from 'ng-devui/nav-sprite';
```

In the page:：

```html
<d-nav-sprite [target]="xxx"></d-nav-sprite>
```

# dNavSprite

## dNavSprite parameters

|         Parameter        |                Type                  |            Default             | Description                            | Jump to Demo                                    |
| :------------------:| :---------------------------------: | :-------------------------: | :------------------------------ | -------------------------------------------- |
|    target  |   `HTMLElement`                     |           --               |         Required. Location of the generated directory    |         [Basic usage](demo#basic)                |
|    scrollTarget         |     `HTMLElement`             |              --              |           Optional. Specifies the scrolling container.            |      [Scroll Usage](demo#scroll)  |
|     view      | `{top?:number,bottom?:number}` |            {top:0,bottom:0}             |                                                   Optional. It is used to adjust the visible region, for example, the head with a fixed position on the top. The value corresponds to the height of the blocked top or bottom.                                                   | [Scroll Usage](demo#scroll)                    |
|    hashSupport         |     `boolean`             |             `false`              |           Optional. Specifies whether to support anchors           |                    --  |
|    mode             |     [`Mode`](#Mode)            |           'default'           |          Optional. mode`default \| sprite`                   |                    [mode](demo#sprite)  |
|    maxLevel         |     `number`                          |           3                 |           Optional. Maximum level of the generated directory               |                    [maxLevel](demo#sprite)  |
|    title         |     `string`                          |              'menu'              |           Optional. title               |                    [title](demo#basic)  |
|    isOpen         |     `boolean`            |              true              |           Optional. sprite mode. open menu           |                    -- |
|    indent         |     `number`                          |              2em              |          Optional. indent 2 placeholders               |                    --  |
|    width         |     `number`                        |              300              |           Optional. width               |                    [width](demo#sprite)  |
|    height         |     `number`                            |              400              |           Optional. height              |                    [height](demo#sprite)  |
|    spriteOption         |     [`SpriteOption`](#SpriteOption)     |              [`defaultOption`](#defaultOption)              |           Optional. sprite mode  initial position              |  [options](demo#sprite)  |
|    navItemTemplate         |     `TemplateRef<any>`             |              --              |           Optional. Single Catalog Template             |                    [template ](demo#sprite)  |


# Interface & Type Definition

## Mode

```ts
export type Mode = 'default' | 'sprite';

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
