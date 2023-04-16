import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MaterialImportModule } from '../material-import/material-import.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportModule,
  ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
