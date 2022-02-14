import { Injectable } from '@angular/core';
import { devuiDarkTheme, devuiLightTheme } from 'ng-devui/theme';
import * as Color from 'color';
import { ColorHierarchyMap } from './color-hierarchy';
type HslModelKey = 'h' | 's' | 'l' | 'a' | 'sp' | 'lp' | 'ap';
type HsvModelKey = 'h' | 's' | 'v' | 'a' | 'sp' | 'vp' | 'ap';
interface IColorOffset {
  hsl?: {
    [p in HslModelKey]?: number;
  };
  hsv?: {
    [p in HsvModelKey]?: number;
  };
}
type ISingleOffset = { [p in HslModelKey]?: number; } | { [p in HsvModelKey]?: number; };
interface IColorObject {
  colorName?: string;
  color?: Color;
  extends?: Color;
  offset?: IColorOffset;
}

interface IColorHierarchy {
  [colorName: string]: {
    'default-value'?: string;
    extends?: string;
    dependency?: string | Array<string>;
    offset?: {
      hsl?: {
        [p in HslModelKey]?: number;
      };
      hsv?: {
        [p in HsvModelKey]?: number;
      };
    };
  };
}
interface IThemeData {
  [colorName: string]: string;
}
interface IColorDef {
  colorName?: string;
  color?: string;
}
type IEffect = 'hsl' | 'hsv' | 'strong' | 'soft' | 'light' | 'contrast';
// hsl | hsv | 浓郁 | 柔和 | 轻快 | 对比 |
@Injectable()
export class CustomThemeService {
  colorHierarchy = ColorHierarchyMap;
  themeDataLight = devuiLightTheme.data;
  themeDataDark = devuiDarkTheme.data;

  public genThemeData(colorChanges: Array<IColorDef>, isDark = false, effect?: IEffect): IThemeData {
    const themeData = isDark ? this.themeDataDark : this.themeDataLight;
    const pattern = this.genColorPattern(this.colorHierarchy, themeData);
    const updatedPattern = this.updateColor(colorChanges, pattern, effect);
    this.fillEmptyColor(updatedPattern, effect);
    return this.pattern2ThemeData(updatedPattern);
  }

  private updateColor(colorChanges: Array<IColorDef>, colorHierarchy: IColorHierarchy, effect?: IEffect) {
    const changeKeys = colorChanges.map(change => change.colorName);
    const changeStack = [...changeKeys];
    const colorKeys = Object.keys(colorHierarchy);
    const pattern = JSON.parse(JSON.stringify(colorHierarchy)) as IColorHierarchy;
    let count = 0;
    while (changeStack.length) {
      const handleKey = changeStack.splice(0, 1).pop();
      if (count < changeKeys.length) {
        pattern[handleKey]['default-value'] = colorChanges[count].color;
      } else {
        const extendsKey = pattern[handleKey].extends;
        const extendsColor = Color(pattern[extendsKey]['default-value']);
        const colorOffset = pattern[handleKey].offset;
        const { mode, offset } = this.getColorEffectOffset(extendsColor, colorOffset, effect);
        pattern[handleKey]['default-value'] = this.getHexOrRgba(
          this.getColorValue(extendsColor, offset, mode)
        );
      }

      colorKeys.forEach(colorName => {
        if (handleKey === pattern[colorName].extends) {
          if (!(changeStack.indexOf(colorName) > -1) && !(changeKeys.indexOf(colorName) > -1)) {
            // 如果不是changeStackUI经做过标记，或者ChangeKeys直接指定了颜色，则标记为需要更新
            changeStack.push(colorName);
          }
        }
      });
      count++;
    }
    return pattern;
  }
  private fillEmptyColor(pattern: IColorHierarchy, effect: IEffect) {
    const colorKeys = Object.keys(pattern);
    const noColorArray = colorKeys.map(colorName => ({
      colorName: colorName,
      pattern: pattern[colorName]
    })).filter(color => !color.pattern['default-value']);
    noColorArray.forEach(color => {

      const handleKey = color.colorName;
      const extendsKey = pattern[handleKey].extends;
      const extendsColor = Color(pattern[extendsKey]['default-value']);
      const colorOffset = pattern[handleKey].offset;
      const { mode, offset } = this.getColorEffectOffset(extendsColor, colorOffset, effect);
      pattern[handleKey]['default-value'] = this.getHexOrRgba(
        this.getColorValue(extendsColor, offset, mode)
      );
    });
  }

  private pattern2ThemeData(pattern: IColorHierarchy): IThemeData {
    const themeData = {};
    const colorKeys = Object.keys(pattern);
    colorKeys.forEach(colorName => {
      themeData[colorName] = pattern[colorName]['default-value'];
    });
    return themeData;
  }

  private genColorPattern(colorHierarchy: IColorHierarchy, themeData: IThemeData): IColorHierarchy {
    const pattern: IColorHierarchy = {};
    const offset = this.getThemeOffset(colorHierarchy, themeData);
    offset.forEach(obj => {
      pattern[obj.colorName] = {
        ...colorHierarchy[obj.colorName],
        'default-value': themeData[obj.colorName],
        offset: obj.offset
      };
    });
    return pattern;
  }
  private getThemeOffset(colorHierarchy: IColorHierarchy, themeData: IThemeData): Array<IColorObject> {
    const colorKeys = Object.keys(colorHierarchy);
    const themeColorOffset = colorKeys.map(key => (
      {
        colorName: key,
        color: Color(themeData[key]),
        extends: this.colorHierarchy[key].extends
          ? Color(themeData[this.colorHierarchy[key].extends])
          : null
      } as IColorObject
    )).map(colorObj => {
      if (colorObj.extends) {
        colorObj.offset = {
          hsl: this.getColorOffset(colorObj.color, colorObj.extends, 'hsl'),
          hsv: this.getColorOffset(colorObj.color, colorObj.extends, 'hsv')
        };
      }
      return colorObj;
    });
    return themeColorOffset;
  }

  private getColorOffset(target: Color, source: Color, mode: 'hsl' | 'hsv'): ISingleOffset {
    const targetModel = target[mode]();
    const sourceModel = source[mode]();
    const key = mode.split('');
    const offset = {
      [key[0]]: targetModel.color[0] - sourceModel.color[0],
      [key[1]]: targetModel.color[1] - sourceModel.color[1],
      [key[2]]: targetModel.color[2] - sourceModel.color[2],
      a: targetModel.valpha - sourceModel.valpha
    };
    const percent = {
      [key[1] + 'p']: offset[key[1]] > 0
        ? offset[key[1]] * 100 / (100 - sourceModel.color[1])
        : offset[key[1]] * 100 / sourceModel.color[1],
      [key[2] + 'p']: offset[key[2]] > 0
        ? offset[key[2]] * 100 / (100 - sourceModel.color[2])
        : offset[key[2]] * 100 / sourceModel.color[2],
      ap: offset.a > 0
        ? offset.a * 100 / (1 - sourceModel.valpha)
        : offset.a * 100 / sourceModel.valpha
    };
    return {
      ...offset,
      ...percent
    };
  }
  private getColorEffectOffset(source: Color, colorOffset: IColorOffset, effect?: IEffect) {
    let result;
    switch (effect) {
    case 'hsl':
      result = {
        mode: 'hsl',
        offset: colorOffset.hsl
      };
      break;
    case 'hsv':
      result = {
        mode: 'hsv',
        offset: colorOffset.hsv
      };
      break;
    case 'strong':
      result = {
        mode: 'hsl',
        offset: {
          ...colorOffset.hsl,
          sp: colorOffset.hsl.sp > 0
            ? this.minmax(colorOffset.hsl.sp * 1.3, colorOffset.hsl.sp, 100)
            : colorOffset.hsl.sp * 0.75
        }
      };
      break;
    case 'soft':
      result = {
        mode: 'hsv',
        offset: {
          ...colorOffset.hsv,
          sp: colorOffset.hsv.sp > 0
            ? this.minmax(colorOffset.hsv.sp * 1.25, colorOffset.hsv.sp, 100)
            : colorOffset.hsv.sp * 0.5
        }
      };
      break;
    case 'light':
      result = {
        mode: 'hsl',
        offset: {
          ...colorOffset.hsl,
          lp: colorOffset.hsl.lp > 0
            ? this.minmax(colorOffset.hsl.lp, colorOffset.hsl.lp, 100)
            : colorOffset.hsl.lp * 0.2
        }
      };
      break;
    case 'contrast': // 需要计算后的颜色，未支持
      result = {
        mode: 'hsl',
        offset: {
          ...colorOffset.hsl
        }
      };
      break;
    default:
      result = {
        mode: 'hsl',
        offset: colorOffset.hsl
      };
      break;

    }
    return result;
  }

  private getColorValue(source: Color, offset: ISingleOffset, mode: 'hsl' | 'hsv') {
    const sourceModel = source[mode]();
    const key = mode.split('');
    const value = {
      [key[0]]: (sourceModel.color[0] + offset[key[0]]) % 360,
      [key[1]]: offset[key[1] + 'p'] > 0
        ? (sourceModel.color[1] + offset[key[1] + 'p'] * (100 - sourceModel.color[1]) / 100)
        : (sourceModel.color[1] + sourceModel.color[1] * offset[key[1] + 'p'] / 100),
      [key[2]]: offset[key[2] + 'p'] > 0
        ? (sourceModel.color[2] + offset[key[2] + 'p'] * (100 - sourceModel.color[2]) / 100)
        : (sourceModel.color[2] + sourceModel.color[2] * offset[key[2] + 'p'] / 100),
      a: offset.ap > 0
        ? (sourceModel.valpha + offset.ap * (1 - sourceModel.valpha) / 100)
        : (sourceModel.valpha + sourceModel.valpha * offset.ap / 100)
    };
    return Color([value[key[0]], value[key[1]], value[key[2]], value.a], mode);
  }

  private getHexOrRgba(color: Color) {
    if (color.alpha() < 1) {
      const rgb = color.rgb();
      const [r, g, b] = rgb.color;
      const a = rgb.valpha;
      return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
    } else {
      return color.hex();
    }
  }

  private minmax(v: number, min: number, max: number) {
    if (v < min) { return min; }
    if (v > max) { return max; }
    return v;
  }
}
