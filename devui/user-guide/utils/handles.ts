export function addBorderAnimation(document: Document) {
  const topBorder = document.querySelector('.user-guide-top-border') as HTMLElement;
  topBorder.classList.add('emphasize-top-animation');

  const bottomBorder = document.querySelector('.user-guide-bottom-border') as HTMLElement;
  bottomBorder.classList.add('emphasize-bottom-animation');

  const leftBorder = document.querySelector('.user-guide-left-border') as HTMLElement;
  leftBorder.classList.add('emphasize-left-animation');

  const rightBorder = document.querySelector('.user-guide-right-border') as HTMLElement;
  rightBorder.classList.add('emphasize-right-animation');
}

export function removeBorderAnimation(document: Document) {
  const topBorder = document.querySelector('.user-guide-top-border') as HTMLElement;
  topBorder.classList.remove('emphasize-top-animation');

  const bottomBorder = document.querySelector('.user-guide-bottom-border') as HTMLElement;
  bottomBorder.classList.remove('emphasize-bottom-animation');

  const leftBorder = document.querySelector('.user-guide-left-border') as HTMLElement;
  leftBorder.classList.remove('emphasize-left-animation');

  const rightBorder = document.querySelector('.user-guide-right-border') as HTMLElement;
  rightBorder.classList.remove('emphasize-right-animation');
}
