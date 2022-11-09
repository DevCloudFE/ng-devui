export function disableClick(e) {
  e.preventDefault();
  e.stopPropagation();
}

export function documentRealHeight(document) {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}
