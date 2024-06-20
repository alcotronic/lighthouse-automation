import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from './service/report.service';

@NgModule({
  imports: [CommonModule],
  providers: [ReportService],
})
export class LhaFrontendDataAccessReportModule {}
