import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportModule } from '../material-import/material-import.module';
import { SetupComponent } from './setup.component';
import { SetupService } from './setup.service';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportModule,
    ToolbarModule,
  ],
  declarations: [SetupComponent],
  providers: [SetupService],
})
export class SetupModule {}
