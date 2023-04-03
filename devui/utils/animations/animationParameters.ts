
export class AnimationDuration {
  static SLOW = '0.3s';
  static BASE = '0.2s';
  static FAST = '0.1s';
}

export class AnimationNumberDuration {
  static SLOW = 300;
  static BASE = 200;
  static FAST = 100;
}

export class AnimationCurves {
  static EASE_OUT = 'cubic-bezier(0.16, 0.75, 0.5, 1)';
  static EASE_IN = 'cubic-bezier(0.5, 0, 0.84, 0.25)';
  static EASE_IN_OUT = 'cubic-bezier(0.5, 0.05, 0.5, 0.95)';
  static LINEAR = 'cubic-bezier(0, 0, 1, 1)';
  /**
     * @deprecated 'EASE_IN_SMOOTH' does not match the actual bezier curve,replaced with 'EASE_IN_OUT_SMOOTH'
     */
  static EASE_IN_SMOOTH = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
  static EASE_IN_OUT_SMOOTH = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
}
