import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './component/toolbar.component';
import { LhaFrontendApiAuthenticationModule } from '@lighthouse-automation/lha-frontend/api/authentication';
import { LhaFrontendApiRoleModule } from '@lighthouse-automation/lha-frontend/api/role';

@NgModule({
  imports: [
    CommonModule,
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
