import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '@lighthouse-automation/lha-frontend/api/task';
import { ReportTaskRunService } from './report-task-run.service';

@Component({
  selector: 'lha-app-report-task-run',
  templateUrl: './report-task-run.component.html',
  styleUrls: ['./report-task-run.component.scss']
})
export class ReportTaskRunComponent implements OnInit {

  task: any;
  taskRun: any;
  taskJobList: any;
  showUrls = true;
  showJobs = true;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private taskRunService: ReportTaskRunService,
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    const taskRunId = this.route.snapshot.paramMap.get('runId');
    if (!!taskId && !!taskRunId) {
      console.log(taskId);
      console.log(taskRunId);
      this.taskService.getTask(taskId).subscribe((result) => {
        this.task = result;
      });
      this.taskRunService
        .getTaskRun(taskRunId)
        .subscribe((result) => {
          this.taskRun = result;
        });
    }
  }

  toggleShowUrls() {
    if (this.showUrls) {
      this.showUrls = false;
    } else {
      this.showUrls = true;
    }
  }

  toggleShowJobs() {
    if (this.showJobs) {
      this.showJobs = false;
    } else {
      this.showJobs = true;
    }
  }
}
