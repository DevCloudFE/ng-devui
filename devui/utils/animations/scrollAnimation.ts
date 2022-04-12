export function scrollAnimate(target, currentTopValue, targetTopValue, timeGap = 40, scrollTime = 450, callback?) {
  if (typeof document === 'undefined' || typeof window === 'undefined' || !target) {
    return;
  }
  const startTimeStamp = Date.now();
  const drawAnimateFrame = () => {
    const currentTime = Date.now() - startTimeStamp;
    if (currentTime - timeGap > scrollTime) {
      target.scrollTop = targetTopValue;
      if (target === document.documentElement) {
        // 兼容写法，老浏览器/老API模式需要document.body滚动，新的需要documentElement滚动
        document.body.scrollTop = targetTopValue;
      }
      if (callback) {
        callback();
      }
    } else {
      const tempTopValue = easeInOutCubic(currentTime, currentTopValue, targetTopValue, scrollTime);
      target.scrollTop = tempTopValue;
      if (target === document.documentElement) {
        document.body.scrollTop = tempTopValue;
      }
      setTimeout(() => {
        requestAnimationFrame(drawAnimateFrame);
      }, timeGap);
    }
  };
  requestAnimationFrame(drawAnimateFrame);
}

export function easeInOutCubic(t: number, b: number, c: number, d: number): number {
  const cc = c - b;
  let tt = t / (d / 2);
  if (tt < 1) {
    return ((cc / 2) * tt * tt * tt + b);
  } else {
    // eslint-disable-next-line no-return-assign
    return ((cc / 2) * ((tt -= 2) * tt * tt + 2) + b);
  }
}
