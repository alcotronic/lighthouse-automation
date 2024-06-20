import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { LhaFrontendDataAccessAccountModule } from '@lighthouse-automation/frontend/data-access/account';

import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    LhaFrontendDataAccessAccountModule,
  ],
  declarations: [AccountSettingsComponent]
})
export class LhaFrontendFeatureAccountSettingsModule {}
