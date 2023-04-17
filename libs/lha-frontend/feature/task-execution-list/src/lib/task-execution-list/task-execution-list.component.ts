import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDto, TaskExecutionDto } from '@lighthouse-automation/lha-common';
import { TaskExecutionService } from '@lighthouse-automation/lha-frontend/api/task-execution';

@Component({
  selector: 'lha-frontend-feature-task-execution-list',
  templateUrl: './task-execution-list.component.html',
  styleUrls: ['./task-execution-list.component.scss']
})
export class TaskExecutionListComponent implements OnInit {

  @Input()
  task!: TaskDto;
  taskExecutionList?: TaskExecutionDto[];

  constructor(private router: Router, private taskExecutionService: TaskExecutionService) { }

  ngOnInit() {
    this.taskExecutionService.getAllTaskExecutionsByTaskId(this.task._id).subscribe((taskExecutionList) =>  {
      this.taskExecutionList = taskExecutionList;
    });
  }

  selectTaskExecution(taskExecution: TaskExecutionDto) {
    console.log(taskExecution._id)
    this.router.navigate(['/task/'+this.task._id+'/execution/'+taskExecution._id]);
  }

}
