<!--
 * @Author: your name
 * @Date: 2020-03-15 15:21:38
 * @LastEditTime: 2020-06-04 23:16:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ng-devui\devui\loading\doc\api.md
--> 
### dLoading 参数

| 参数        | 类型                            | 默认        |   说明                                      |
| :---------: | :-----------------------------: | :---------: | :------------------------------------------|
| loading     | `LoadingType`                    | --    | 可选，控制loading状态|
| message     | `string`                         | --     | 可选，loading时的提示信息 |
| loadingTemplateRef | `TemplateRef<any>`               | --      | 可选，自定义loading模板 |
| backdrop    | `boolean`                        | --     | 可选，loading时是否显示遮罩 |
| showLoading | `boolean` | --      | 可选，手动启动和关闭loading状态,与`loading`参数不能同时使用 |
| positionType | `string` | 'relative'      | 可选，指定`dLoading`宿主元素的定位类型,取值与css position属性一致 |
| view | `{top?:string,left?:string}` | {top:'50%',left:'50%'}      | 可选，调整loading的显示位置，相对于宿主元素的顶部距离与左侧距离 |

LoadingType 为 `Observable<any> | Promise<any> | Array<Promise<any>> | Array<Observable<any>> | undefined`
