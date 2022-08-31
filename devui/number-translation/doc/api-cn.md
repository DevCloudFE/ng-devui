# 如何使用

在module中引入：

```ts
import { NumberTransModule } from 'ng-devui/number-translation';
```

在页面中以pipe方式使用：

```
<div>{{ value | dNumberTrans: type }}</div>
```

# dNumberTrans

## pipe 参数
|         参数         |        类型        |  默认值   | 描述                                                           |全局配置项| 
| :----------------: | :------------------: | :----------------: | :-----: | :------------------------------------------------------------- |
|       value        | `'string' \| 'number'` | - |   pipe转换的值                        |
|       type  | `'comma' \| 'unit' \| 'flow' \| 'exponent'` | 'comma' | pipe第一个参数，转换的四种类型，分别是千分逗号，单位，流量，科学计数法。 |
|       fixedNum        |  `number` |  2  | pipe第二个参数，非必选，小数点保留位数  |


## 转换类型介绍

[转换标准参考](https://zh.wikipedia.org/wiki/%E5%9B%BD%E9%99%85%E5%8D%95%E4%BD%8D%E5%88%B6%E8%AF%8D%E5%A4%B4)

### comma

数字转换为整数区域千分位逗号类型

### unit

单位类型，按照 k(千), M(百万), G(吉), T(兆)进行单位转换;

### flow

转换为流量单位， 按最大流量转 kb, Mb, Gb, Tb;

### exponent

按科学计数法转换为字符串， 如2.34e12;
