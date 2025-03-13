import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'd-safe-null-pipe',
    templateUrl: './safe-null-pipe.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SafeNullPipeComponent {
  name = '';
  gender = void 0;
  age = 18;
  address = null;
}
