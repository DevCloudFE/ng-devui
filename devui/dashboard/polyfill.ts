/* eslint-disable */
// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
export default ((...rest) => {
  const arr = rest[0];
  arr.forEach((item) => {
    if (Object.prototype.hasOwnProperty.call(item, 'append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        const argArr = [...rest];
        const docFrag = document.createDocumentFragment();

        argArr.forEach((argItem) => {
          const isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.appendChild(docFrag);
      },
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
