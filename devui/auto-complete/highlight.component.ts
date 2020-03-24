import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';

@Component({
  selector: 'd-highlight',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlightComponent implements OnChanges {
  @HostBinding('innerHTML') get htmlContent() { return this.highlightHtml; }
  @HostBinding('style.display') display = 'inline';
  @Input() value: string;
  @Input() term: string;
  highlightHtml: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.highlightHtml = this.transform(this.value, this.term);
  }

  transform(value: string, term: string): any {
    return value && term ? this.highlight(value, term) : value;
  }

  highlight(value: string, term: string) {
    const regExp = new RegExp(term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
    return value.replace(regExp, function (match) {
      return `<b class="re-highlight">${match}</b>`;
    });
  }
}
