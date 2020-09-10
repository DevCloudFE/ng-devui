export interface DragPlaceholderInsertionEvent {
  command: 'insertBefore' | 'append' | 'remove';
  container?: HTMLElement;
  relatedEl?: Element;
}
export interface DragPlaceholderInsertionIndexEvent {
  command: 'insertBefore' | 'append' | 'remove';
  index?: number;
}
