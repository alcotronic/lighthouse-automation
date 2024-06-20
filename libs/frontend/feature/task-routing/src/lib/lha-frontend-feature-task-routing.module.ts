import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@lighthouse-automation/frontend/data-access/authentication';
import { TaskComponent } from '@lighthouse-automation/frontend/feature/task';
import { TaskCreateComponent } from '@lighthouse-automation/frontend/feature/task-create';
import { TaskListComponent } from '@lighthouse-automation/frontend/feature/task-list';
import { TaskExecutionComponent } from '@lighthouse-automation/frontend/feature/task-execution';

const taskRoutes: Routes = [
  {
    path: 'task',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: TaskCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'list',
        component: TaskListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: TaskComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':taskId/execution/:taskExecutionId',
        component: TaskExecutionComponent,
        canActivate: [AuthGuard],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(taskRoutes)],
  exports: [RouterModule],
})
export class LhaFrontendFeatureTaskRoutingModule {}
