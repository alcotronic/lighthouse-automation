import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LhaFrontendDataAccessAuthenticationModule } from '@lighthouse-automation/frontend/data-access/authentication';
import { LhaFrontendFeatureToolbarModule } from '@lighthouse-automation/frontend/feature/toolbar';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    LhaFrontendDataAccessAuthenticationModule,
    LhaFrontendFeatureToolbarModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LhaFrontendFeatureLoginModule {}
