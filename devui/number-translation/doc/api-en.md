
# How to Use

The following information is added to the module:

```ts
import { NumberTransModule } from 'ng-devui/number-translation';
```

Use in pipe mode on the page:

```
<div>{{value | dNumberTrans: type}}</div>
```

# dNumberTrans

## Pipe parameter
|Parameter|Type|Default value|Description|Global configuration item|
| :----------------: | :------------------: | :----------------: | :-----: | :------------------------------------------------------------- |
| value | `'string' \| 'number'` | - | Value converted by pipe|
| type | `'comma' \| 'unit' \| 'flow' \| 'exponent' ` | 'comma' | pipe The first parameter indicates the four types of conversion: comma, unit, traffic, and scientific notation.|
| fixedNum | `number` | 2 | Second parameter of pipe. This parameter is optional. The number of decimal places is reserved. |

## Introduction to Conversion Types

[Conversion Standard Reference](https://zh.wikipedia.org/wiki/%E5%9B%BD%E9%99%85%E5%8D%95%E4%BD%8D%E5%88%B6%E8%AF%8D%E5%A4%B4)

### comma

Number to Integer Region Millile Comma Type

### unit

Unit type. The unit is converted in k (thousand), M (million), G (gi), and T (mega).

### flow

Convert to the unit of traffic. The unit is kb, Mb, Gb, and Tb based on the maximum traffic.

### exponent

Convert to a character string by scientific notation, for example, 2.34e12.
