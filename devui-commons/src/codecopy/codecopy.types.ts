export const StrCopySVG = {
  CopySVG:
    // tslint:disable-next-line: max-line-length
    '<svg class="devui-api-code-copy" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M10 4v-4h-7l-3 3v9h6v4h10v-12h-6zM3 1.414v1.586h-1.586l1.586-1.586zM1 11v-7h3v-3h5v3l-3 3v4h-5zM9 5.414v1.586h-1.586l1.586-1.586zM15 15h-8v-7h3v-3h5v10z"></path></svg>',

  CopySuccessSVG:
    // tslint:disable-next-line: max-line-length
    '<svg class="devui-code-copy-success" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 16 16" version="1.1"><defs><polygon id="path-1" points="6.53553391 9.77817459 12.1923882 4.12132034 13.6066017 5.53553391 6.53553391 12.6066017 3 9.07106781 4.41421356 7.65685425 6.53553391 9.77817459"/></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><mask id="mask-2" fill="white"><use xlink:href="#path-1" /></mask><use id="Mask" fill="#3DCCA6" xlink:href="#path-1" /></g></svg>',
};

export const ReadTipOption = {
  optionSuccessData: {
    'zh-cn': {
      position: 'bottom',
      rules: {
        selector: '.devui-code-copy-success',
        content: '复制成功',
      },
    },
    'en-us': {
      position: 'bottom',
      rules: {
        selector: '.devui-code-copy-success',
        content: 'Success',
      },
    },
  },
  optionData: {
    'zh-cn': {
      position: 'bottom',
      rules: {
        selector: '.devui-api-code-copy',
        content: '复制代码',
      },
    },
    'en-us': {
      position: 'bottom',
      rules: {
        selector: '.devui-api-code-copy',
        content: 'Copy Code',
      },
    },
  },
};
