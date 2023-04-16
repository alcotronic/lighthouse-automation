import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportModule } from '../material-import/material-import.module';
import { LoginComponent } from './login.component';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { LhaFrontendApiAuthenticationModule } from '@lighthouse-automation/lha-frontend/api/authentication';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportModule,
    LhaFrontendApiAuthenticationModule,
    ToolbarModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
