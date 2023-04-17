import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountToolbarModule } from './account-toolbar/account-toolbar.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { MaterialImportModule } from '../material-import/material-import.module';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportModule,
    AccountRoutingModule,
    AccountToolbarModule,
  ],
  declarations: [AccountComponent, AccountSettingsComponent],
})
export class AccountModule {}
