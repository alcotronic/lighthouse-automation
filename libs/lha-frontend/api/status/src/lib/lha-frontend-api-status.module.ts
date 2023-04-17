import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusService } from './service/status.service';

@NgModule({
  imports: [CommonModule],
  providers: [StatusService]
})
export class LhaFrontendApiStatusModule {}
