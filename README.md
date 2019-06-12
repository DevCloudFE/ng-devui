<div align="center">
<svg width="80px" height="80px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient x1="89.5364583%" y1="21.60078%" x2="7.57349918%" y2="65.7395747%" id="linearGradient-1">
            <stop stop-color="#2954C8" offset="0%"></stop>
            <stop stop-color="#5170FF" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="89.5364583%" y1="21.4573588%" x2="7.57349918%" y2="65.8190624%" id="linearGradient-2">
            <stop stop-color="#2954C8" offset="0%"></stop>
            <stop stop-color="#5170FF" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="-11.5260417%" y1="24.3907324%" x2="87.1145833%" y2="74.8850926%" id="linearGradient-3">
            <stop stop-color="#89D2FF" offset="0%"></stop>
            <stop stop-color="#5170FF" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="0%" y1="18.4813953%" x2="75.9513522%" y2="81.5186047%" id="linearGradient-4">
            <stop stop-color="#89D2FF" offset="0%"></stop>
            <stop stop-color="#5170FF" offset="100%"></stop>
        </linearGradient>
    </defs>
    <g id="Devui-Logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group-2" transform="translate(3.000000, 0.000000)">
            <g>
                <path d="M4.28576801,9.22873192 L9.32098286,6.02205882 L13.1143389,8.49673203 L0.010890596,17.0193525 L0.010890596,17.0193525 C0.010890596,13.8625823 1.62310848,10.9244448 4.28576801,9.22873192 Z" id="Path-39-Copy-3" fill="url(#linearGradient-1)"></path>
                <path d="M8.76945593,17.4828869 L14.1939212,14.0196078 L18.2867527,16.6963836 L4.14882163,25.9150327 L4.14882163,25.9150327 C4.14882163,22.4998846 5.89095741,19.3206798 8.76945593,17.4828869 Z" id="Path-39-Copy-2" fill="url(#linearGradient-2)" transform="translate(11.217787, 19.967320) scale(-1, 1) translate(-11.217787, -19.967320) "></path>
                <path d="M0.183304389,2.48689958e-13 L13.1143389,8.49673203 L9.42310099,10.9017055 L9.42310099,10.9017055 C4.36778167,11.0371959 0.159798979,7.04888649 0.0243085926,1.99356717 C0.00937841938,1.43650334 0.0453320846,0.879239543 0.13172203,0.32871271 L0.183304389,2.48689958e-13 Z" id="Path-38-Copy-3" fill="url(#linearGradient-3)"></path>
                <path d="M4.54131151,6.55708742 L19.8945577,16.6535948 L16.2033199,19.0585682 L11.1830136,17.9470593 C6.34348625,16.8755752 3.2888836,12.0837536 4.36036765,7.24422626 C4.41158805,7.01288123 4.47194996,6.78365535 4.54131151,6.55708742 L4.54131151,6.55708742 Z" id="Path-38-Copy-2" fill="url(#linearGradient-4)" transform="translate(12.021690, 12.807828) scale(-1, 1) translate(-12.021690, -12.807828) "></path>
            </g>
        </g>
    </g>
</svg>
</div>

# <center>DevUI for Angular</center>

## Features
* 企业级组件，提供配套设计规范、字体图标库
* 开箱即用

## Getting Started

1. Installation:

```bash
 # install
 npm i ng-devui
```
2. Usage:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DevUIModule } from 'ng-devui';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // 引入公共service
    DevUIModule.forRoot()
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }

```


## Contribution

Read up on our guidelines for [contributing](./CONTRIBUTING.md).

## Support
Modern browsers and Internet Explorer 11+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## LICENSE
**MIT**
