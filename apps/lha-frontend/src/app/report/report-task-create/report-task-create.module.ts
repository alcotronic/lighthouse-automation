import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTaskCreateComponent } from './report-task-create.component';
import { MaterialImportModule } from '../../material-import/material-import.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LhaFrontendApiTaskModule } from '@lighthouse-automation/lha-frontend/api/task';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportModule,
    LhaFrontendApiTaskModule
  ],
  declarations: [ReportTaskCreateComponent],
})
export class ReportTaskCreateModule {}
