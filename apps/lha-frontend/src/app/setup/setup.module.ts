import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportModule } from '../material-import/material-import.module';
import { SetupComponent } from './setup.component';
import { LhaFrontendFeatureToolbarModule } from '@lighthouse-automation/lha-frontend/feature/toolbar';
import { LhaFrontendApiSetupModule } from '@lighthouse-automation/lha-frontend/api/setup';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportModule,
    LhaFrontendApiSetupModule,
    LhaFrontendFeatureToolbarModule,
  ],
  declarations: [SetupComponent]
})
export class SetupModule {}
