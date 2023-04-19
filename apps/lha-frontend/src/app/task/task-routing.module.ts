import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TaskComponent } from '@lighthouse-automation/lha-frontend/feature/task';
import { TaskCreateComponent } from '@lighthouse-automation/lha-frontend/feature/task-create';
import { TaskListComponent } from '@lighthouse-automation/lha-frontend/feature/task-list';
import { TaskExecutionComponent } from '@lighthouse-automation/lha-frontend/feature/task-execution';

const reportRoutes: Routes = [
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
  imports: [RouterModule.forChild(reportRoutes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
