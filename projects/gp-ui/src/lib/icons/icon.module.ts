import { NgModule } from '@angular/core';
import { EyeIcon } from './eye-icon/eye-icon';
import { EyeSlashIcon } from './eye-slash-icon/eye-slash-icon';
import { CircleXIcon } from './circle-x-icon/circle-x-icon';

@NgModule({
  imports: [CircleXIcon, EyeIcon, EyeSlashIcon],
  exports: [CircleXIcon, EyeIcon, EyeSlashIcon],
})
export class IconModule {}
