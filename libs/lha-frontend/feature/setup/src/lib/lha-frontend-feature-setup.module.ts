import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LhaFrontendApiSetupModule } from '@lighthouse-automation/lha-frontend/api/setup';
import { SetupComponent } from './setup/setup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    LhaFrontendApiSetupModule
  ],
  declarations: [SetupComponent],
})
export class LhaFrontendFeatureSetupModule {}
