import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '@lighthouse-automation/lha-frontend/api/task';
import {
  TaskCreateDto,
  TaskInterval,
  TaskType,
} from '@lighthouse-automation/lha-common';

@Component({
  selector: 'lha-frontend-feature-task-list',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent {
  URL_REGEXP =
    /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:;.?+=&%@\-/]*)?$/;

  createTaskForm: FormGroup;
  nameControl = new FormControl('');
  typeControl = new FormControl(TaskType.MANUAL_REPORT);
  intervalControl = new FormControl(TaskInterval.EVERY_DAY);
  enabledControl = new FormControl(false);
  urlListControl = new FormControl('', Validators.pattern(this.URL_REGEXP));

  urlList: Array<string> = [];

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private router: Router
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
        if (
          this.nameControl.value &&
          this.nameControl.valid &&
          this.urlList.length > 0
        ) {
          const reportTaskCreateDto: TaskCreateDto = {
            name: this.nameControl.value,
            taskType: this.typeControl.value,
            enabled: false,
            taskInterval: TaskInterval.NEVER,
            urlList: this.urlList,
          };
          this.taskService
            .createTask(reportTaskCreateDto)
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
          const reportTaskCreateDto: TaskCreateDto = {
            name: this.nameControl.value,
            taskType: this.typeControl.value,
            enabled: this.enabledControl.value,
            taskInterval: this.intervalControl.value,
            urlList: this.urlList,
          };
          this.taskService
            .createTask(reportTaskCreateDto)
            .subscribe((result: any) => {
              console.log(result);
              if (result._id) {
                this.router.navigate(['task/list']);
              }
            });
        }
      }
    } else {
      console.log('typeControl is invalid.');
    }
  }

  clickCancleCreateTask() {
    this.router.navigate(['task/list']);
  }
}