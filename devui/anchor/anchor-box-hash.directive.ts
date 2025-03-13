import { AfterViewInit, Directive, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { AnchorBoxDirective } from './anchor-box.directive';
import { AnchorLinkDirective } from './anchor-link.directive';
import { AnchorDirective } from './anchor.directive';

@Directive({
    selector: '[dAnchorBox][dAnchorHashSupport]',
    standalone: false
})
export class AnchorBoxHashSupportDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() updateUrlWhenAnchorActive = true;
  @Input() scrollToAnchorByHashOnlyInit = false;
  sub: Subscription = new Subscription();
  manual = false;

  constructor(private box: AnchorBoxDirective, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub.add(this.box.activeChange.pipe(
      debounceTime(300),
      filter(anchor => this.updateUrlWhenAnchorActive)
    ).subscribe(this.navigateToHash));

    this.sub.add(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      this.navigateToAnchor
    ));
  }

  ngAfterViewInit(): void {
    const frag = this.route.snapshot.fragment;
    setTimeout(() => {
      this.scrollToFragment(frag);
    }, 120);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  navigateToHash = (targetAnchor: AnchorDirective) => {
    if (targetAnchor.activeChangeBy === 'initial') { return; }
    this.router.navigate([], { fragment: targetAnchor.anchor, replaceUrl: true });
    this.manual = true;
  };

  navigateToAnchor = (event: NavigationEnd) => {
    if (this.manual) {
      this.manual = false;
      return;
    }
    if (this.scrollToAnchorByHashOnlyInit) { return; }
    const frag = this.router.parseUrl(event.url).fragment;
    this.scrollToFragment(frag);
  };

  scrollToFragment = (frag: string) => {
    if (!frag) { return; }
    if (this.box.anchorMap[frag]) {
      const tempAnchor = new AnchorLinkDirective(this.box);
      tempAnchor.anchorName = frag;
      tempAnchor.anchorBlock = this.box.anchorMap[frag];
      tempAnchor.scrollToAnchor('fragment');
    }
  };
}
