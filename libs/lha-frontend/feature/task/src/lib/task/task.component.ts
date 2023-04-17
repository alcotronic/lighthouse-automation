import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '@lighthouse-automation/lha-frontend/api/task';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'lha-frontend-feature-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  task: any;
  taskRunList: any;
  showUrls = true;
  showRuns = true;

  barChartOptions: ChartOptions = {};
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartDataset[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTask(taskId).subscribe((result) => {
        this.task = result;
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

  chartClicked(): void {
    console.log('chartClicked');
  }

  chartHovered(): void {
    console.log('chartHovered');
  }
}
