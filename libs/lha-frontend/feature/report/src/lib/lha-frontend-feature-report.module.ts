import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule],
  declarations: [ReportComponent],
  exports: [ReportComponent],
})
export class LhaFrontendFeatureReportModule {}
