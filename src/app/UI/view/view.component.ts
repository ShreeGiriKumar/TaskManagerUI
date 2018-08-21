import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TaskDO } from 'src/app/Model/task';
import { SharedService } from 'src/app/Services/shared.service';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { formatDate } from '@angular/common';
import { map, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [DatePipe]
})
export class ViewComponent implements OnInit {
  originalTasks$: Observable<TaskDO[]>;
  filteredTasks: TaskDO[];
  filterTask: string = null;
  filterParentTask: string = null;
  filterPriorityFrom: string = null;
  filterPriorityTo: string = null;
  filterStartDate: string = null;
  filterEndDate: string = null;
  taskToEnd : TaskDO;

  constructor(private sharedService: SharedService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.getTasks();
  }

  /* Function to end the Task */
  endTask(taskId: number) {
    this.taskToEnd = this.filteredTasks.find(x=>x.TaskId == taskId);
    this.taskToEnd.IsTaskEnded = true;
    this.sharedService.updateTask(taskId, this.taskToEnd).subscribe(()=>{
      this.getTasks();
    });  
  }

  /** Function to get all Tasks initially */
  getTasks() {
    this.originalTasks$ = this.sharedService.getTasks();
    this.originalTasks$.subscribe(data => {
      this.filteredTasks = data
    });
  }

  /** Function to filter by Task */
  filterByTask() {
    this.filteredTasks = this.filteredTasks.filter(data => data.TaskInfo.startsWith(this.filterTask));
    if (this.filterTask == "")
      this.reloadLocalData();
  }

  /** Function to filter by Parent Task */
  filterByParent() {
    this.filteredTasks = this.filteredTasks.filter(data =>  data.ParentTask != null && data.ParentTask.startsWith(this.filterParentTask));
    if (this.filterParentTask == "")
      this.reloadLocalData();
  }

  /** Function to filter by Priotity From*/
  filterByPriorityFrom() {
    this.filteredTasks = this.filteredTasks.filter(data => data.Priority >= parseFloat(this.filterPriorityFrom));
    if (this.filterPriorityFrom == null)
      this.reloadLocalData();
  }

  /** Function to filter by Priotity To*/
  filterByPriorityTo() {
    this.filteredTasks = this.filteredTasks.filter(data => data.Priority <= parseFloat(this.filterPriorityTo));
    if (this.filterPriorityTo == null)
      this.reloadLocalData();
  }

  /** Function to filter by Start Date*/
  filterByStartDate() {
    this.filteredTasks = this.filteredTasks.filter(data => this.datePipe.transform(data.StartDate, 'yyyy-MM-dd') == this.filterStartDate);
    if (this.filterStartDate == "")
      this.reloadLocalData();
  }

  /** Function to filter by Start End*/
  filterByEndDate() {
    this.filteredTasks = this.filteredTasks.filter(data => this.datePipe.transform(data.EndDate, 'yyyy-MM-dd') == this.filterEndDate);
    if (this.filterEndDate == "")
      this.reloadLocalData();
  }

  /** Function to reload view*/
  reloadLocalData() {
    if ((this.filterTask == "" || this.filterTask == null)
      && (this.filterParentTask == "" || this.filterParentTask == null)
      && (this.filterPriorityFrom == "" || this.filterPriorityFrom == null)
      && (this.filterPriorityTo == "" || this.filterPriorityTo == null)
      && (this.filterStartDate == "" || this.filterStartDate == null)
      && (this.filterEndDate == "" || this.filterEndDate == null))
      this.originalTasks$.subscribe(data => {
        this.filteredTasks = data;
      });
  }
}
