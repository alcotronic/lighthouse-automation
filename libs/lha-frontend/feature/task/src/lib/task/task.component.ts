import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDto, TaskExecutionDto } from '@lighthouse-automation/lha-common';
import { TaskFacade } from '@lighthouse-automation/lha-frontend/data-access/task';
import { TaskExecutionService } from '@lighthouse-automation/lha-frontend/data-access/task-execution';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lha-frontend-feature-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  task?: TaskDto;
  taskExecutionList?: TaskExecutionDto[];
  showUrls = true;
  showRuns = true;

  barChartOptions: ChartOptions = {};
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartDataset[] = [];

  unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private taskExecutionService: TaskExecutionService,
    private taskFacade: TaskFacade
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskFacade.selectedTask$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((task) => {
          this.task = task;
        });
      this.taskFacade.selectTask(taskId);
      this.taskExecutionService
        .getAllTaskExecutionsByTaskId(taskId)
        .pipe(takeUntil(this.unsubscribe$))
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.taskFacade.clearSelectedTask();
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
