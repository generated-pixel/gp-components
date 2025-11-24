import { NgModule } from '@angular/core';
import { EyeIcon } from './eye-icon/eye-icon';
import { EyeSlashIcon } from './eye-slash-icon/eye-slash-icon';

@NgModule({
  imports: [EyeIcon, EyeSlashIcon],
  exports: [EyeIcon, EyeSlashIcon],
})
export class IconModule {}
