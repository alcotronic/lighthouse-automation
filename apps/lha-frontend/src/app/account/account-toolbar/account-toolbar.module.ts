import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountToolbarComponent } from './account-toolbar.component';
import { RouterModule } from '@angular/router';
import { MaterialImportModule } from '../../material-import/material-import.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MaterialImportModule,
  ],
  declarations: [AccountToolbarComponent],
  exports: [AccountToolbarComponent]
})
export class AccountToolbarModule { }
