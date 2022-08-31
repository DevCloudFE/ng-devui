import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// @dynamic
export class DValidators {
  // eslint-disable-next-line max-len
  private static readonly ScriptPattern = /<+\/?[Ss][Cc][Rr][Ii][Pp][Tt] *.*>*/;
  // eslint-disable-next-line max-len
  private static readonly UrlPattern = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
  private static readonly Ipv4Pattern = /^(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))$/i;
  // eslint-disable-next-line max-len
  private static readonly Ipv6Pattern = /^(((([\da-f]{1,4}):){7}([\da-f]{1,4}))|(((([\da-f]{1,4}):){1,7}:)|((([\da-f]{1,4}):){6}:([\da-f]{1,4}))|((([\da-f]{1,4}):){5}:(([\da-f]{1,4}):)?([\da-f]{1,4}))|((([\da-f]{1,4}):){4}:(([\da-f]{1,4}):){0,2}([\da-f]{1,4}))|((([\da-f]{1,4}):){3}:(([\da-f]{1,4}):){0,3}([\da-f]{1,4}))|((([\da-f]{1,4}):){2}:(([\da-f]{1,4}):){0,4}([\da-f]{1,4}))|((([\da-f]{1,4}):){1}:(([\da-f]{1,4}):){0,5}([\da-f]{1,4}))|(::(([\da-f]{1,4}):){0,6}([\da-f]{1,4}))|(::([\da-f]{1,4})?))|(((([\da-f]{1,4}):){6}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){5}:(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){4}:(([\da-f]{1,4}):)?(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){3}:(([\da-f]{1,4}):){0,2}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){2}:(([\da-f]{1,4}):){0,3}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(([\da-f]{1,4})::(([\da-f]{1,4}):){0,4}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(::(([\da-f]{1,4}):){0,5}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))))$/i;
  private static readonly AlphabetPattern = /^[a-zA-Z]+(\s+[a-zA-Z]+)*$/;
  private static readonly DigitPattern = /^\d+$/;
  private static readonly IntegerPattern = /^-?\d+$/;
  private static readonly NumberPattern = /^(?:-?\d+|[+-]?[\d]+([\.][\d]+)?([Ee][+-]?[\d]+)?|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/; // 支持科学计数法
  private static readonly PortRange: [number, number] = [0, 65535];
  private static isEmptyInput(value: any): boolean {
    return value === null || value.length === 0;
  }

  /* Failed if only has whitespace */
  public static whiteSpace(control: AbstractControl): ValidationErrors | null {
    let res = null;
    if (typeof control.value === 'string' && control.value.length !== 0 && control.value.trim().length === 0) {
      res = { whitespace: true };
    }
    return res;
  }

  /**
   * 校验是否包含
   * @param contain
   * @returns
   */
  public static contains(contain: string | number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (DValidators.isEmptyInput(control.value) || DValidators.isEmptyInput(contain)) {
        return null;
      }

      return control.value.indexOf(contain) === -1 ? { contains: { requiredContains: contain, actualValue: control.value } } : null;
    };
  }

  /**
   * 校验是否不包含
   * @param contain
   * @returns
   */
  public static notContains(contain: string | number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (DValidators.isEmptyInput(control.value) || DValidators.isEmptyInput(contain)) {
        return null;
      }

      return control.value.indexOf(contain) !== -1 ? { notContains: { requiredNotContains: contain, actualValue: control.value } } : null;
    };
  }

  /**
   * 校验是否相等
   * @param equal
   * @returns
   */
  public static equal(equal: string | number | boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (DValidators.isEmptyInput(control.value) || DValidators.isEmptyInput(equal)) {
        return null;
      }

      return control.value !== equal ? { equal: { requiredEqual: equal, actualValue: control.value } } : null;
    };
  }

  /**
   * 校验是否不相等
   * @param equal
   * @returns
   */
  public static notEqual(equal: string | number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (DValidators.isEmptyInput(control.value) || DValidators.isEmptyInput(equal)) {
        return null;
      }

      return control.value === equal ? { notEqual: { requiredNotEqual: equal, actualValue: control.value } } : null;
    };
  }

  /**
   * 校验端口号
   * @param control
   * @returns
   */
  public static port(control: AbstractControl): ValidationErrors | null {
    if (DValidators.isEmptyInput(control.value)) {
      return null;
    }

    return DValidators.DigitPattern.test(control.value) &&
      control.value >= DValidators.PortRange[0] &&
      control.value <= DValidators.PortRange[1]
      ? null
      : { port: { min: DValidators.PortRange[0], max: DValidators.PortRange[1] } };
  }

  /**
   * 校验日期是否合法
   * @param control
   * @returns
   */
  public static date(control: AbstractControl): ValidationErrors | null {
    if (DValidators.isEmptyInput(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }

    return !/Invalid|NaN/.test(new Date(control.value).toString()) ? null : { date: true };
  }

  /**
   * 校验 url 是否合法
   * @param control
   * @returns
   */
  public static url(control: AbstractControl): ValidationErrors | null {
    if (DValidators.isEmptyInput(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }

    return DValidators.UrlPattern.test(control.value) ? null : { url: true };
  }

  /**
   * 校验整数
   * @param control
   * @returns
   */
  public static integer(control: AbstractControl): ValidationErrors | null {
    if (DValidators.isEmptyInput(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }

    return DValidators.IntegerPattern.test(control.value) ? null : { integer: true };
  }

  /**
   * 校验是否是数字
   * @param control
   * @returns
   */
  public static digits(control: AbstractControl): ValidationErrors | null {
    if (DValidators.isEmptyInput(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }

    return DValidators.DigitPattern.test(control.value) ? null : { digits: true };
  }

  /**
   * 校验数字，支持科学计数法
   * @param control
   * @returns
   */
  public static number(control: AbstractControl): ValidationErrors | null {
    if (DValidators.isEmptyInput(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }

    return DValidators.NumberPattern.test(control.value) ? null : { number: true };
  }

  /**
   * 校验是否是字母
   * @param control
   * @returns
   */
  public static alphabet(control: AbstractControl): ValidationErrors | null {
    if (DValidators.isEmptyInput(control.value)) {
      return null;
    }

    return DValidators.AlphabetPattern.test(control.value) ? null : { alphabet: true };
  }

  /**
   * 校验是 script 标签
   * @param control
   * @returns
   */
  public static notScript(control: AbstractControl): ValidationErrors | null {
    if (DValidators.isEmptyInput(control.value)) {
      return null;
    }

    return DValidators.ScriptPattern.test(control.value) ? { notScript: true } : null;
  }

  /**
   * 校验 ipv4
   * @param control
   * @returns
   */
  public static ipv4(control: AbstractControl): ValidationErrors | null {
    if (DValidators.isEmptyInput(control.value)) {
      return null;
    }

    return DValidators.Ipv4Pattern.test(control.value) ? null : { ipv4: true };
  }

  /**
   * 校验 ipv6
   * @param control
   * @returns
   */
  public static ipv6(control: AbstractControl): ValidationErrors | null {
    if (DValidators.isEmptyInput(control.value)) {
      return null;
    }

    return DValidators.Ipv6Pattern.test(control.value) ? null : { ipv6: true };
  }
}
