import { GridStackOptions } from 'gridstack';
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  window.navigator.userAgent
);
const dragDropOption = {
  alwaysShowResizeHandle: isMobile,
  resizable: {
    autoHide: !isMobile,
    handles: 'se'
  },
  acceptWidgets: '.grid-stack-new-item',
  dragIn: '.grid-stack-new-item',  // class that can be dragged from outside
  dragInOptions: { revert: 'invalid', scroll: true, appendTo: 'body', helper: 'clone' },
  removable: '.grid-stack-library-trash', // drag-out delete class
  removeTimeout: 10,
};
const displayOption = {
  column: 12,
  cellHeight: 160,
  margin: 8,
  float: true,
};
export const DashBoardGridStackDefaultOption: GridStackOptions = {
  ...displayOption,
  ...dragDropOption,
  disableDrag: false,
  disableResize: false,
  animate: true
};
