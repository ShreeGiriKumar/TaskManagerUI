import { Component, OnInit } from '@angular/core';
import { TaskDO } from 'src/app/Model/task';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
import { error } from 'selenium-webdriver';

@NgModule({
  imports: [
    FormsModule
  ]
})

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})


export class AddComponent implements OnInit {

  taskName: string;
  parentTask: string;
  priority: number;
  startDate: string;
  endDate: string;
  taskData: TaskDO;
  sliderVal: number;


  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  /**Function to Add Task */
  addTask() {
    let taskData: TaskDO = {
      TaskId: 0,
      TaskInfo: this.taskName,
      ParentTask: this.parentTask,
      Priority: this.priority,
      StartDate: new Date(this.startDate),
      EndDate: new Date(this.endDate),
      IsTaskEnded: false
    };

    this.sharedService.addTask(taskData).subscribe( () => {});
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
