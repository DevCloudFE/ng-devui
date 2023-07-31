import { Component, ViewChild } from '@angular/core';
import { DropDownDirective } from 'ng-devui/dropdown';
import { InputGroupComponent } from 'ng-devui/input-group';

@Component({
  selector: 'd-input-group-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.scss'],
})
export class EmbedComponent {
  @ViewChild('protocolItem') protocolItem: InputGroupComponent;
  devui = 'devui.design';
  protocolValue = 'https://';
  protocolOptions = ['http://', 'https://', 'ftp://', 'mailTo://'];
  protocolDisabled = 'mailTo://';
  mailBox = 'your-mail@devui.design';
  icon = 'icon-star';
  iconColor = 'var(--devui-shadow)';
  paddingLeft = '';

  selectItem(item: string, dropdown: DropDownDirective): void {
    this.protocolValue = item;
    setTimeout(() => this.protocolItem.changeInputPadding('left', `${dropdown.el.nativeElement.parentElement?.offsetWidth || ''}px`));
  }

  lightUp(): void {
    const isLight = this.iconColor === 'var(--devui-warning)';
    this.icon = 'icon-right';
    this.iconColor = 'var(--devui-success)';
    setTimeout(() => {
      this.icon = 'icon-star';
      this.iconColor = isLight ? 'var(--devui-shadow)' : 'var(--devui-warning)';
    }, 1200);
  }
}
