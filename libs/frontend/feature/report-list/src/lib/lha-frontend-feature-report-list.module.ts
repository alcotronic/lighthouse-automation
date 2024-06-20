import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportListComponent } from './report-list/report-list.component';
import { LhaFrontendFeatureReportModule } from '@lighthouse-automation/frontend/feature/report';

@NgModule({
  imports: [CommonModule,  LhaFrontendFeatureReportModule],
  declarations: [ReportListComponent],
  exports: [ReportListComponent],
})
export class LhaFrontendFeatureReportListModule {}
