import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LhaFrontendApiAuthenticationModule } from '@lighthouse-automation/lha-frontend/api/authentication';
import { LhaFrontendApiRoleModule } from '@lighthouse-automation/lha-frontend/api/role';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    LhaFrontendApiAuthenticationModule,
    LhaFrontendApiRoleModule
  ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
})
export class LhaFrontendFeatureToolbarModule {}
