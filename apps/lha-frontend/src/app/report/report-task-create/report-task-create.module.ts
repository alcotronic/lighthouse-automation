import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTaskCreateComponent } from './report-task-create.component';
import { MaterialImportModule } from '../../material-import/material-import.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportModule,
  ],
  declarations: [ReportTaskCreateComponent],
})
export class ReportTaskCreateModule {}
