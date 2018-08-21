import { Injectable } from '@angular/core';
import { TaskDO } from 'src/app/Model/task';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials' : 'true'})
};


@Injectable({
  providedIn: 'root'
})


export class SharedService {

  tasksUrl: string = "http://localhost:1234/api/task";

  /** Generic Error Handler */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead 
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {
  }

  /** Service to Add a Task */
  addTask(task: TaskDO) {
    return this.http.post<TaskDO>(this.tasksUrl, JSON.stringify(task), httpOptions).pipe(
      tap(heroes => console.log('Task Added')),
      catchError(this.handleError<TaskDO>('Add a new Task'))
    );
  }

  /** Service to Get Task By Id */
  getTask(id: number): Observable<TaskDO> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<TaskDO>(url).pipe(
      catchError(this.handleError<TaskDO>(`Get Task id=${id}`))
    );
  }

  /** Service to Gat All Tasks */
  getTasks(): Observable<TaskDO[]> {
    return this.http.get<TaskDO[]>(this.tasksUrl).pipe(
      catchError(this.handleError('Get All Tasks', []))
    );
  }

  /** Service to Update Task */
  updateTask(id: number, task: TaskDO): Observable<any> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.put(url, JSON.stringify(task), httpOptions).pipe(
      catchError(this.handleError<any>('Update Task'))
    );
  }

  /** Service to End Task */
  endTask(id: number) {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.put(url, id, httpOptions).pipe(
      catchError(this.handleError<any>('Mark Task Ended'))
    );
  }  
}
