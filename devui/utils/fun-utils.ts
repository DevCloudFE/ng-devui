export function unshiftString(str: string, targetLength: number, addString: string): string {
  targetLength = targetLength > 0 ? targetLength : 0;
  addString = String((typeof addString !== 'undefined' && typeof addString !== 'object') ? addString : ' ');
  str = (str === undefined || str === null) ? '' : String(str);
  if (str.length >= targetLength) {
    return String(str);
  } else {
    targetLength = targetLength - str.length;
    if (targetLength > addString.length) {
      addString += addString.repeat(targetLength / addString.length);
    }
    return addString.slice(0, targetLength) + String(str);
  }
}
