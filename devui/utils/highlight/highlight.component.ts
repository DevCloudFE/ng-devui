import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, HostBinding, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'd-highlight',
    template: ``,
    styleUrls: ['./highlight.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlightComponent implements OnChanges {
    @HostBinding('innerHTML') get htmlContent() { return this.highlightHtml; }
    @HostBinding('style.display') display = 'inline';
    @Input() value: string;
    @Input() term: string;
    /**
     * @deprecated
     */
    @Input() highlightClass = 'devui-match-highlight';
    highlightHtml: any;
    constructor(private translateHtml: DomSanitizer) { }
    ngOnChanges(changes: SimpleChanges): void {
        this.highlightHtml = this.translateHtml.bypassSecurityTrustHtml(this.transform(this.value, this.term));
    }

    transform(value: string, term: string): any {
        return value && term ? this.highlight(value, term) : value;
    }

    highlight(value: string, term: string) {
        const regExp = new RegExp(term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
        return value.replace(regExp, function (match) {
            return `<span class="devui-match-highlight">${match}</span>`;
        });
    }
}
