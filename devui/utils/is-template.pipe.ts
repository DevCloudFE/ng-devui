import { Pipe, PipeTransform, TemplateRef } from '@angular/core';

@Pipe({
  name: 'dIsTemplatePipe',
})
export class IsTemplatePipe implements PipeTransform {
  transform(content: string | TemplateRef<any>, defaultTemplate: TemplateRef<any>): TemplateRef<any> {
    return content instanceof TemplateRef ? content : defaultTemplate;
  }
}
