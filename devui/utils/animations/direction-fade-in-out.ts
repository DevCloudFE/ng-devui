import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animationParameters';
const easeOut = AnimationCurves.EASE_OUT;
const easeIn =  AnimationCurves.EASE_IN;
const duration = AnimationDuration.FAST;
const scaleY = 'scaleY(0.8)';
const scaleX = 'scaleX(0.8)';
const scaleY1 = 'scaleY(1)';
const scaleX1 = 'scaleX(1)';
const scaleXToVoid = 'scaleX(0.8)';
const scaleYToVoid = 'scaleY(0.8)';

export const directionFadeInOut: AnimationTriggerMetadata = trigger('directionFadeInOut', [
  state('void', style({opacity: 0, })),
  state('bottom', style({opacity: 1, })),
  state('bottom-left', style({opacity: 1})),
  state('bottom-right', style({opacity: 1})),
  state('top', style({opacity: 1})),
  state('top-left', style({opacity: 1})),
  state('top-right', style({opacity: 1})),
  state('left', style({opacity: 1})),
  state('left-top', style({opacity: 1})),
  state('left-bottom', style({opacity: 1})),
  state('right', style({opacity: 1})),
  state('right-top', style({opacity: 1})),
  state('right-bottom', style({opacity: 1})),
  // 下方
  transition('* => bottom', [
    style({opacity: 0.8 , transform: `${scaleY}`, transformOrigin: '50% -8px'}),
    animate(`${duration}  ${easeOut}`, style({opacity: 1, transform: `${scaleY1}` }))
  ]),
  transition('bottom => void', [
    style({  transformOrigin: '50% -8px'}),
    animate(`${duration}  ${easeIn}`,  style({transform: `${scaleYToVoid}`, opacity: 0.8}))
  ]),
  transition('* => bottom-left', [
    style({opacity: 0.8 , transform: `${scaleY}`, transformOrigin: '50% -8px'}),
    animate(`${duration}  ${easeOut}`, style({opacity: 1, transform: `${scaleY1}` }))
  ]),
  transition('bottom-left => void', [
    style({ opacity: 1, transformOrigin: '50% -8px'}),
    animate(`${duration}  ${easeIn}`,  style({transform: `${scaleYToVoid}`, opacity: 0.8}))
  ]),
  transition('* => bottom-right', [
    style({opacity: 0.8 , transform: `${scaleY}`, transformOrigin: '50% -8px'}),
    animate(`${duration}  ${easeOut}`, style({opacity: 1, transform: `${scaleY1}` }))
  ]),
  transition('bottom-right => void', [
    style({ opacity: 1, transformOrigin: '50% -8px'}),
    animate(`${duration}  ${easeIn}`,  style({transform: `${scaleYToVoid}`, opacity: 0.8}))
  ]),

  // 上方
  transition('* => top', [
    style({opacity: 0.8 , transform: `${scaleY}`, transformOrigin: '50% calc(100% + 8px)'}),
    animate(`${duration}  ${easeOut}`, style({opacity: 1, transform: `${scaleY1}`, }))
  ]),
  transition('top => void', [
    style({ opacity: 1, transformOrigin: '50% calc(100% + 8px)'}),
    animate(`${duration}  ${easeIn}`,  style({transform: `${scaleYToVoid}`, opacity: 0.8}))
  ]),
  transition('* => top-left', [
    style({opacity: 0.8 , transform: `${scaleY}`, transformOrigin: '50% calc(100% + 8px)'}),
    animate(`${duration}  ${easeOut}`, style({opacity: 1, transform: `${scaleY1}`, }))
  ]),
  transition('top-left => void', [
    style({ opacity: 1, transformOrigin: '50% calc(100% + 8px)'}),
    animate(`${duration}  ${easeIn}`,  style({transform: `${scaleYToVoid}`, opacity: 0.8}))
  ]),
  transition('* => top-right', [
    style({opacity: 0.8 , transform: `${scaleY}`, transformOrigin: '50% calc(100% + 8px)'}),
    animate(`${duration}  ${easeOut}`, style({opacity: 1, transform: `${scaleY1}`, }))
  ]),
  transition('top-right => void', [
    style({ opacity: 1, transformOrigin: '50% calc(100% + 8px)'}),
    animate(`${duration}  ${easeIn}`,  style({transform: `${scaleYToVoid}`, opacity: 0.8}))
  ]),

  // 左方
  transition('* => left', [
    style({opacity: 0.8, transform: `${scaleX}`, transformOrigin: 'calc(100% + 8px)'}),
    animate(`${duration}  ${easeOut}`, style({opacity: 1, transform: `${scaleX1}` }))
  ]),
  transition('left => void', [
    style({ opacity: 1, transformOrigin: 'calc(100% + 8px)'}),
    animate(`${duration}  ${easeIn}`,  style({transform: `${scaleXToVoid}`,   opacity: 0.8}))
  ]),
  transition('* => left-top', [
    style({opacity: 0.8, transform: `${scaleX}`, transformOrigin: 'calc(100% + 8px)'}),
    animate(`${duration}  ${easeOut}`, style({opacity: 1, transform: `${scaleX1}` }))
  ]),
  transition('left-top => void', [
    style({ opacity: 1, transformOrigin: 'calc(100% + 8px)'}),
    animate(`${duration}  ${easeIn}`,  style({transform: `${scaleXToVoid}`,   opacity: 0.8}))
  ]),
  transition('* => left-bottom', [
    style({opacity: 0.8, transform: `${scaleX}`, transformOrigin: 'calc(100% + 8px)'}),
    animate(`${duration}  ${easeOut}`, style({opacity: 1, transform: `${scaleX1}` }))
  ]),
  transition('left-bottom => void', [
    style({ opacity: 1, transformOrigin: 'calc(100% + 8px)'}),
    animate(`${duration}  ${easeIn}`,  style({transform: `${scaleXToVoid}`,   opacity: 0.8}))
  ]),
  //  右方
  transition('* => right', [
    style({opacity: 0.8, transform: `${scaleX}`, transformOrigin: '-8px 50% '}),
    animate(`${duration}  ${easeOut}`, style({opacity: 1, transform: `${scaleX1}`}))
  ]),
  transition('right => void', [
    style({ opacity: 1, transformOrigin: '-8px 50% '}),
    animate(`${duration}  ${easeIn}`,  style({transform: `${scaleXToVoid}`,   opacity: 0}))
  ]),
  transition('* => right-top', [
    style({opacity: 0.8, transform: `${scaleX}`, transformOrigin: '-8px 50% '}),
    animate(`${duration}  ${easeOut}`, style({opacity: 1, transform: `${scaleX1}`}))
  ]),
  transition('right-top => void', [
    style({ opacity: 1, transformOrigin: '-8px 50% '}),
    animate(`${duration}  ${easeIn}`,  style({transform: `${scaleXToVoid}`,   opacity: 0.8}))
  ]),
  transition('* => right-bottom', [
    style({opacity: 0.8, transform: `${scaleX}`, transformOrigin: '-8px 50% '}),
    animate(`${duration}  ${easeOut}`, style({opacity: 1, transform: `${scaleX1}`}))
  ]),
  transition('right-bottom => void', [
    style({ opacity: 1, transformOrigin: '-8px 50% '}),
    animate(`${duration}  ${easeIn}`,  style({transform: `${scaleXToVoid}`,   opacity: 0.8}))
  ]),
]);
