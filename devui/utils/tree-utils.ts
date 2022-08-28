export class TreeUtils {
  // 动态添加styles
  public static addElStyles(el: any, styles: any) {
    if (styles instanceof Object) {
      for (const s in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, s)) {
          if (Array.isArray(styles[s])) {
            // 用于支持兼容渐退
            styles[s].forEach(val => {
              el.style[s] = val;
            });
          } else {
            el.style[s] = styles[s];
          }
        }
      }
    }
  }
}
