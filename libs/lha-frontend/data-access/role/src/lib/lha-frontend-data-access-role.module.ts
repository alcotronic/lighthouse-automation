import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RoleService } from './service/role.service';
import * as fromRole from './+state/role.reducer';
import { RoleEffects } from './+state/role.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromRole.ROLE_FEATURE_KEY,
      fromRole.roleReducer
    ),
    EffectsModule.forFeature([RoleEffects]),
  ],
  providers: [RoleService],
})
export class LhaFrontendDataAccessRoleModule {}
