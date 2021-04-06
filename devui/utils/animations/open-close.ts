/** @deprecated  use collapseForDomDestroy to replace */

import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const openClose: AnimationTriggerMetadata = trigger('openClose', [
  state('void', style({ transform: 'scaleY(0)', height: 0, opacity: 0, transformOrigin: '50% 0% 0px' })),
  state('open', style({ transform: 'scaleY(0.9999)', opacity: 1, transformOrigin: '50% 0% 0px' })),
  transition('void => open', [animate('300ms ease-in-out')]),
  transition('open => void', [animate('300ms ease-in-out')]),
]);
