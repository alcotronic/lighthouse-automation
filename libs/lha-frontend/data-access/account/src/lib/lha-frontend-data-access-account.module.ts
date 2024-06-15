import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountService } from './service/account.service';

@NgModule({
  imports: [CommonModule],
  providers: [AccountService]
})
export class LhaFrontendDataAccessAccountModule {}
