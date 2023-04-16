import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReportTaskCreateDto, ReportTaskInterval, ReportTaskType } from './report-task-create';
import { ReportTaskCreateService } from './report-task-create.service';

@Component({
  selector: 'lha-app-report-task-create',
  templateUrl: './report-task-create.component.html',
  styleUrls: ['./report-task-create.component.scss'],
})
export class ReportTaskCreateComponent {
  URL_REGEXP = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:;.?+=&%@\-/]*)?$/;

  createTaskForm: FormGroup;
  nameControl = new FormControl('');
  typeControl = new FormControl(ReportTaskType.MANUAL_REPORT);
  intervalControl = new FormControl(ReportTaskInterval.EVERY_DAY);
  enabledControl = new FormControl(false);
  urlListControl = new FormControl('', Validators.pattern(this.URL_REGEXP));

  urlList: Array<string> = [];

  constructor(
    private reportTaskCreateService: ReportTaskCreateService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.createTaskForm = formBuilder.group({});
  }

  addUrl() {
    if (this.urlListControl.value && this.urlListControl.valid) {
      console.log('urlListControl is valid.');
      this.urlList.push(this.urlListControl.value);
      this.urlListControl.setValue('');
    } else {
      console.log('urlListControl is invalid.');
    }
  }

  removeUrl(url: string) {
    const index = this.urlList.indexOf(url);
    if (index > -1) {
      this.urlList.splice(index, 1);
    }
  }

  async clickCreateTask() {
    if (this.typeControl.valid) {
      console.log('typeControl is valid.');
      if (this.typeControl.value === 'MANUAL_REPORT') {
        console.log('Validate MANUAL_REPORT');
        if (this.nameControl.value && this.nameControl.valid && this.urlList.length > 0) {
          const reportTaskCreateDto: ReportTaskCreateDto = {
            name: this.nameControl.value,
            reportType: this.typeControl.value,
            enabled: false,
            reportTaskInterval: ReportTaskInterval.NEVER,
            urlList: this.urlList,
          };
          this.reportTaskCreateService
            .submitTaskCreate(reportTaskCreateDto)
            .subscribe((result: any) => {
              console.log(result);
              if (result._id) {
                this.router.navigate(['report-task']);
              }
            });
        }
      } else if (this.typeControl.value === 'SCHEDULED_REPORT') {
        console.log('Validate SCHEDULED_REPORT');
        if (
          this.nameControl.valid &&
          this.intervalControl.valid &&
          this.enabledControl.valid &&
          this.urlList.length > 0 &&
          this.nameControl.value &&
          this.typeControl.value &&
          this.enabledControl.value &&
          this.intervalControl.value
        ) {
          const reportTaskCreateDto: ReportTaskCreateDto = {
            name: this.nameControl.value,
            reportType: this.typeControl.value,
            enabled: this.enabledControl.value,
            reportTaskInterval: this.intervalControl.value,
            urlList: this.urlList,
          };
          this.reportTaskCreateService
            .submitTaskCreate(reportTaskCreateDto)
            .subscribe((result: any) => {
              console.log(result);
              if (result._id) {
                this.router.navigate(['report-task']);
              }
            });
        }
      }
    } else {
      console.log('typeControl is invalid.');
    }
  }

  clickCancleCreateTask() {
    this.router.navigate(['report-task/list']);
  }
}
