import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Directive({
  selector: 'd-card-content, [dCardContent]'
})
export class CardContentDirective {
  @HostBinding('class.devui-card-content') default = true;

}

@Directive({
  selector: `d-card-title, [dCardTitle]`
})
export class CardTitleDirective {
  @HostBinding('class.devui-card-title') default = true;

}

@Directive({
  selector: `d-card-subtitle, [dCardSubtitle]`,
})
export class CardSubtitleDirective {
  @HostBinding('class.devui-card-subtitle') default = true;
}

@Directive({
  selector: 'd-card-actions,[dCardActions]',
  exportAs: 'dCardActions',
})
export class CardActionsDirective {
  @Input() align: 'start' | 'end' | 'spaceBetween' = 'start';
  @HostBinding('class.devui-card-actions') default = true;
  @HostBinding('class.devui-card-actions-align-end')
  get alignEnd() {
    return this.align === 'end';
  }
  @HostBinding('class.devui-card-actions-align-space-between')
  get alignSpaceBetween() {
    return this.align === 'spaceBetween';
  }
}

@Directive({
  selector: '[dCardMeta]',
  exportAs: 'dCardMeta'
})
export class CardMetaDirective {
  @HostBinding('class.devui-card-meta') default = true;
}

@Directive({
  selector: '[dCardAvatar]'
})
export class CardAvatarDirective {
  @HostBinding('class.devui-card-avatar') default = true;
}

@Component({
  selector: 'd-card',
  exportAs: 'dCard',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @HostBinding('class.devui-card') default = true;
}

@Component({
  selector: 'd-card-header',
  templateUrl: './card-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @HostBinding('class.devui-card-header') default = true;
}

// waiting for design
@Component({
  selector: 'd-card-extend',
  templateUrl: './card-extend.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardExtendComponent {
  @HostBinding('class.devui-card-extend') default = true;
}
