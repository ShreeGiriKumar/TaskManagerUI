import { Injectable } from '@angular/core';
import { TaskDO } from 'src/app/Model/task';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SharedMockService {

  constructor() { }

  addTask(task: TaskDO) {
    return null;
  }

  getTask(id: number): Observable<TaskDO> {
    const taskDO: TaskDO = { TaskId: 1, TaskInfo: 'Task 1', ParentTask: 'Parent Task', Priority: 12, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false };
    return Observable.create(data => {
      data.next(taskDO);
      data.complete();
    });
  }

  getTasks(): Observable<TaskDO[]> {
    const mockTasks: TaskDO[] = [
      { TaskId: 1, TaskInfo: 'Task 1', ParentTask: 'Parent Task', Priority: 12, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false },
      { TaskId: 2, TaskInfo: 'Task 2', ParentTask: '', Priority: 1, StartDate: new Date('2018-08-12'), EndDate: new Date('2018-08-13'), IsTaskEnded: false }
    ];
    return Observable.create(data => {
      data.next(mockTasks);
      data.complete();
    });
  }

  updateTask(id: number, task: TaskDO) {
    return null;
  }
}
