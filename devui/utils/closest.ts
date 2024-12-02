// element-closest | CC0-1.0 | github.com/jonathantneal/closest

if (typeof Element.prototype.matches !== 'function') {
  Element.prototype.matches =
    (Element.prototype as any).msMatchesSelector ||
    (Element.prototype as any).mozMatchesSelector ||
    (Element.prototype as any).webkitMatchesSelector ||
    function matches(selector) {
      const element = this;
      const elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      let index = 0;

      while (elements[index] && elements[index] !== element) {
        ++index;
      }

      return Boolean(elements[index]);
    };
}

if (typeof Element.prototype.closest !== 'function') {
  (Element.prototype.closest as Function) = function closest(selector) {
    let element = this;

    while (element && element.nodeType === 1) {
      if (element.matches(selector)) {
        return element;
      }

      element = element.parentNode;
    }

    return null;
  };
}
