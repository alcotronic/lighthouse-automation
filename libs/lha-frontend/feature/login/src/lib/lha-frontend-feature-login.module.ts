import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LhaFrontendApiAuthenticationModule } from '@lighthouse-automation/lha-frontend/api/authentication';
import { LhaFrontendFeatureToolbarModule } from '@lighthouse-automation/lha-frontend/feature/toolbar';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    LhaFrontendApiAuthenticationModule,
    LhaFrontendFeatureToolbarModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LhaFrontendFeatureLoginModule {}
