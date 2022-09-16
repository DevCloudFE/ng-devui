import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'd-safe-null-pipe',
  templateUrl: './safe-null-pipe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeNullPipeComponent {
  name = '';
  age = void 0;
  address = null;
}
