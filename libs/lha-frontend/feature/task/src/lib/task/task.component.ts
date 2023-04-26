import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDto, TaskExecutionDto } from '@lighthouse-automation/lha-common';
import { TaskService } from '@lighthouse-automation/lha-frontend/api/task';
import { TaskExecutionService } from '@lighthouse-automation/lha-frontend/api/task-execution';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'lha-frontend-feature-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  task?: TaskDto;
  taskExecutionList?: TaskExecutionDto[];
  showUrls = true;
  showRuns = true;

  barChartOptions: ChartOptions = {};
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartDataset[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private taskExecutionService: TaskExecutionService
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTask(taskId).subscribe((result) => {
        this.task = result;
      });
      this.taskExecutionService
        .getAllTaskExecutionsByTaskId(taskId)
        .subscribe((result) => {
          this.taskExecutionList = result;
          this.barChartLabels = [];
          this.barChartData = [];
          const barCharDataDesktop: number[] = [];
          const barCharDataMobile: number[] = [];
          this.taskExecutionList.forEach((element: TaskExecutionDto) => {
            const date = new Date(element.timestamp);
            const label =
              date.toLocaleTimeString() + ', ' + date.toLocaleDateString();
            this.barChartLabels.push(label);
            barCharDataDesktop.push(
              +(element.performanceScoreDesktop * 100).toFixed(0)
            );
            barCharDataMobile.push(
              +(element.performanceScoreMobile * 100).toFixed(0)
            );
          });
          this.barChartData.push({
            data: barCharDataDesktop,
            label: 'Desktop performance',
            borderColor: '#b82dd0',
            borderWidth: 2,
            backgroundColor: '#b82dd078',
            hoverBackgroundColor: '#6b1979',
          });
          this.barChartData.push({
            data: barCharDataMobile,
            label: 'Mobile performance',
            borderColor: 'cyan',
            borderWidth: 2,
            backgroundColor: '#00ffff78',
            hoverBackgroundColor: '#008686',
          });
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

  toggleShowRuns() {
    if (this.showRuns) {
      this.showRuns = false;
    } else {
      this.showRuns = true;
    }
  }
}
