import { Pipe, PipeTransform, Renderer2, TemplateRef } from '@angular/core';

@Pipe({
  name: 'dInputGroupPipe',
})
export class InputGroupPipe implements PipeTransform {

  constructor(private render: Renderer2) {}

  transform(
    content: string | TemplateRef<any>,
    defaultTemplate: TemplateRef<any>,
    isEmbed: boolean,
    containerEl: HTMLElement,
    affixEl: HTMLElement,
    style: string
  ): TemplateRef<any> {
    if (isEmbed) {
      const inputEl = containerEl?.querySelector('input[dTextInput]');
      if (inputEl) {
        setTimeout(() => this.render.setStyle(inputEl, style, `${affixEl?.offsetWidth + 4}px`));
      }
    }
    return typeof content === 'string' ? defaultTemplate : content;
  }
}
