import { ConnectedPosition } from '@angular/cdk/overlay';

// Block application conditions are to be determined and are not open in APIs.
export type AppendToBodyScrollStrategyType = 'block' | 'close' | 'noop' | 'reposition';
export type AppendToBodyDirection = 'rightDown' | 'rightUp' | 'leftUp' | 'leftDown' | 'centerDown' | 'centerUp';
export const AppendToBodyDirectionsConfig: {
  [p in AppendToBodyDirection]: ConnectedPosition;
} = {
  rightDown: {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  },
  rightUp: {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
  },
  leftUp: {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
  },
  leftDown: {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
  },
  centerDown: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },
  centerUp: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
  },
};
