# How to use

Import into module:

```ts
import { CardModule } from 'ng-devui/card';
```

In the page:

```xml
<d-card>
  <d-card-header>
    <d-card-title></d-card-title>
    <d-card-subtitle></d-card-subtitle>
  </d-card-header>
  <d-card-content> </d-card-content>
  <d-card-actions></d-card-actions>
</d-card>
```
# d-card
## d-card Block Division

|      Tag     |                                       Description                                               |
| :------------: | :--------------------------------------------------------------------------------------------: |
| d-card-header | Title area, which is used as an overview. It usually contains elements such as title `d-card-title`, subtitle `d-card-subtitle`, and avatar `dAvatar` |
| [dCardMeta] | Media information area, which can store multiple media, including pictures, graphics, and videos |
| d-card-content | Auxiliary information area, which analyzes and supports the title function. It can contain abstracts or descriptions |
| d-card-actions | Decision-making function, which can contain operation text or operation icons |

## d-card-header Block Division

|        Tag      |            Description                 |
| :-------------: | :------------------------------------: |
| d-card-title | Card content description, which is generally defined as the card name |
| [dCardAvatar] | Avatar area, which is used to display images such as avatars |
| d-card-subtitle | Supplement to the title, including tag information |

## d-card-actions Parameter

| Parameter |       Type   |     Default      |       Description        | Jump to Demo |
|   :---:   |         :------:        | :---: | :-------------: | --------- |
|   align   |   `'start'\|'end'\|'spaceBetween'`  |        'start'      | Optional. Operation area alignment mode, which corresponds to start alignment, tail alignment, and stretch alignment | [Basic usage](demo#card-basic) |
