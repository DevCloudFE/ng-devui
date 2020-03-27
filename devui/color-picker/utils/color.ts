// ----------------------------------------------------------------------------
// Color
// ----------------------------------------------------------------------------

/**
 * Get Color by Pointer Position in Slider
 * Slider Colors: ['#ff0000', '#ffff00', '#00ff00', '#00ffff',
 *                 '#0000ff', '#ff00ff', '#ff0000']
 *
 * @param   x        from 0 to 1
 * @return           hex
 */
function getColorByPointerPositionInSlider(x) {
  const rgb = ['r', 'g', 'b'].map(channel => {
    return getColorOfOneChannelByPointerPositionInSlider(x, channel);
  });
  return rgbToHex.apply(null, rgb);
}

/**
 * Get Pointer Position in Slider by Color
 *
 * @param   hex      hex color
 * @return           from 0 to 1
 */
function getPointerPositionInSliderByColor(hex) {
  const [r, g, b] = hexToRgb(hex);
  let x = 0;
  if (r === 255 && b === 0) {
    x = g / 255 / 6;
  }
  if (r === 0 && g === 255) {
    x = b / 255 / 6 + 2 / 6;
  }
  if (g === 0 && b === 255) {
    x = r / 255 / 6 + 4 / 6;
  }
  if (g === 255 && b === 0) {
    x = - r / 255 / 6 + 2 / 6;
  }
  if (r === 0 && b === 255) {
    x = - g / 255 / 6 + 4 / 6;
  }
  if (r === 255 && g === 0) {
    x = - b / 255 / 6 + 6 / 6;
  }
  return x;
}

/**
 * Color to Pure Color
 *
 * @param   hex      hex color
 * @param   x        from 0 to 1
 * @param   y        from 0 to 1
 * @return           hex
 */
function colorToPureColor(hex) {
  let rgb = hexToRgb(hex);
  rgb = rgb.map(c => {
    return c - Math.min(...rgb);
  });
  // if the input hex is white/gray/black
  if (sumOf(rgb) === 0) {
    return '#ffffff';
  }
  rgb = rgb.map(c => {
    return Math.round(c * 255 / Math.max(...rgb));
  });
  // HACK: rgbToHex(...rgb) not working, and i have no idea of it.
  return rgbToHex.apply(null, rgb);
}

/**
 * Map pure(top right) color to the pointed color
 *
 * @param   hex      hex color
 * @param   x        from 0 to 1
 * @param   y        from 0 to 1
 * @return           hex
 */
function getColorByPosition(hex, x, y) {
  let rgb = hexToRgb(hex);
  // add white
  rgb = rgb.map(c => {
    return c + (255 - c) * (1 - x);
  });
  // add black
  rgb = rgb.map(c => {
    return Math.round(c * (1 - y));
  });
  return rgbToHex.apply(null, rgb);
}

/**
 * Get the color position in the panel
 *
 * @param   hex      hex color
 * @return           position
 */
function getColorPosition(hex) {
  let rgb = hexToRgb(hex);
  let x, y = 0;
  y = 1 - Math.max(...rgb) / 255;
  rgb = rgb.map(c => {
    return Math.round(c / (1 - y));
  });
  x = 1 - Math.min(...rgb) / 255;
  return {
    x,
    y
  };
}

/**
 * Get color value of one channel by pointer position in slider
 *
 * @param   x        from 0 to 1
 * @param   channel  one of ['r', 'g', 'b']
 * @return           hex
 */
function getColorOfOneChannelByPointerPositionInSlider(x, channel) {
  // map all channels to green channel
  switch (channel) {
    case 'r':
      x += 2 / 6;
      x = x > 1 ? x - 1 : x;
      break;
    case 'g':
      break;
    case 'b':
      x += 4 / 6;
      x = x > 1 ? x - 1 : x;
      break;
    default:
      break;
  }
  if (x < 1 / 6) {
    return Math.floor(x * 6 * 256);
  }
  if (1 / 6 <= x && x <= 3 / 6) {
    return 255;
  }
  if (3 / 6 < x && x < 4 / 6) {
    return Math.floor((4 / 6 - x) * 6 * 256);
  }
  return 0;
}

function rgbToHex(r, g, b) {
  // '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  const pow = Math.pow;
  return '#' + ((1 * pow(256, 3)) + (r * pow(256, 2)) + (g * 256) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
  hex = hexColorSpread(hex);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

function sumOf(nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum;
}

function saveRecentColors(recentColors: string[], currentColor: string, limit: number) {
  const indexOfCurrent = indexOfColor(recentColors, currentColor);
  if ((indexOfCurrent >= 0)) {
    recentColors.splice(indexOfCurrent, 1);
  }
  recentColors.unshift((currentColor));
  if (recentColors.length > limit) {
    recentColors.splice(limit, 1);
  }
  return;
}

function indexOfColor(recentColors: string[], currentColor: string) {
  for (let i = 0; i < recentColors.length; i++) {
    if (hexColorSpread(recentColors[i]) === hexColorSpread(currentColor)) {
      return i;
    }
  }
  return -1;
}

/**
 * Spread hex color. e.g. '#fff' => '#ffffff'
 */
function hexColorSpread(color: string) {
  const colorArr = color.split('');
  if (colorArr.length === 4) {
    for (let i = 3; i > 0; i--) {
      colorArr.splice(i, 0, colorArr[i]);
    }
  }
  color = colorArr.join('');
  return color;
}

export {
    getColorByPosition,
    colorToPureColor,
    getColorPosition,
    getColorByPointerPositionInSlider,
    getPointerPositionInSliderByColor,
    saveRecentColors
};
