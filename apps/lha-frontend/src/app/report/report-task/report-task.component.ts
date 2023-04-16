import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { ReportTaskRunListService } from '../report-task-run-list/report-task-run-list.service';
import { ReportTaskRun } from '../report-task-run/report-task-run';
import { TaskService } from '@lighthouse-automation/lha-frontend/api/task';

@Component({
  selector: 'lha-app-report-task',
  templateUrl: './report-task.component.html',
  styleUrls: ['./report-task.component.scss'],
})
export class ReportTaskComponent implements OnInit {
  reportTask: any;
  reportTaskRunList: any;
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
    private reportTaskRunListService: ReportTaskRunListService
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTask(taskId).subscribe((result) => {
        this.reportTask = result;
      });
      this.reportTaskRunListService
        .getAllReportTaskRuns(taskId)
        .subscribe((result) => {
          this.reportTaskRunList = result;
          this.barChartLabels = [];
          this.barChartData = [];
          const barCharDataDesktop: number[] = [];
          const barCharDataMobile: number[] = [];
          this.reportTaskRunList.forEach((element: ReportTaskRun) => {
            const date = new Date(element.timestamp);
            const label =
              date.toLocaleTimeString() + ', ' + date.toLocaleDateString();
            this.barChartLabels.push(label);
            console.log(element);
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

  chartClicked(): void {
    console.log('chartClicked');
  }

  chartHovered(): void {
    console.log('chartHovered');
  }
}
