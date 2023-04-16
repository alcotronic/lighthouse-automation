import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ReportTaskCreateComponent } from './report-task-create/report-task-create.component';
import { ReportTaskListComponent } from './report-task-list/report-task-list.component';
import { ReportTaskRunComponent } from './report-task-run/report-task-run.component';
import { ReportTaskComponent } from './report-task/report-task.component';
import { ReportComponent } from './report.component';

const reportRoutes: Routes = [
  {
    path: 'report-task',
    component: ReportComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ReportTaskListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        component: ReportTaskCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'task/:id',
        component: ReportTaskComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'task/:taskId/run/:runId',
        component: ReportTaskRunComponent,
        canActivate: [AuthGuard],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(reportRoutes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
