import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { LhaFrontendApiTaskModule } from '@lighthouse-automation/lha-frontend/api/task';
import { TaskCreateComponent } from './task-create/task-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    LhaFrontendApiTaskModule,
  ],
  declarations: [TaskCreateComponent],
  exports: [TaskCreateComponent],
})
export class LhaFrontendFeatureTaskCreateModule {}
