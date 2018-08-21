import { Component, OnInit } from '@angular/core';
import { TaskDO } from 'src/app/Model/task';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/Services/shared.service';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    FormsModule
  ]
})

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe]
})
export class EditComponent implements OnInit {

  taskName: string;
  parentTask: string;
  priority: number;
  startDate: string;
  endDate: string;
  taskData: TaskDO;
  taskId: number;
  sliderVal: number;

  constructor(private route: ActivatedRoute, private sharedService: SharedService,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.getTask();
  }

  /**Function to Update Task */
  updateTask() {

    let taskData: TaskDO = {
      TaskId: this.taskId,
      TaskInfo: this.taskName,
      ParentTask: this.parentTask,
      Priority: this.priority,
      StartDate: new Date(this.startDate),
      EndDate: new Date(this.endDate),
      IsTaskEnded: false
    };

    this.sharedService.updateTask(taskData.TaskId, taskData).subscribe(() => { });
  }

  /**Function to Get Task */
  getTask() {
    this.sharedService.getTask(parseFloat(this.route.snapshot.paramMap.get('id'))).subscribe(data => {
      this.taskId = data.TaskId;
      this.taskName = data.TaskInfo;
      this.parentTask = data.ParentTask;
      this.priority = data.Priority;
      this.startDate = this.datePipe.transform(data.StartDate, 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(data.EndDate, 'yyyy-MM-dd');
    });
  }

  /**Function to Reset UI Fields */
  resetFields() {
    this.taskName = "";
    this.parentTask = "";
    this.priority = null;
    this.startDate = null;
    this.endDate = null;
  }


  /**To display priority chosen */
  show_value(val: number) {
    this.sliderVal = this.priority;
  }
}
