import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupService } from './service/setup.service';

@NgModule({
  imports: [CommonModule],
  providers: [SetupService]
})
export class LhaFrontendApiSetupModule {}
