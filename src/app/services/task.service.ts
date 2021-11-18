import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { Task } from "../models/task";
import { environment } from "src/environments/environment";

const URL = environment.url;

@Injectable()
export class TaskService{

    last_task: Task;

    constructor(
        public _http: HttpClient,
    ){
        this.last_task = new Task(0, '', '', false);
    }

    getTasks(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get<Task[]>(URL + '/tasks', {headers: headers});
    }

    takeTask(id:number){
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(URL + '/tasks/'+id, {headers: headers});
    }

    saveTask(task: Task): Observable<any>{
        let body = JSON.stringify(task);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(URL + '/tasks', body, {headers: headers});
    }

    updateTask(id:number, task:Task){
        let body = JSON.stringify(task);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(URL + '/tasks/'+id, body, {headers: headers});
    }

    deleteTask(id:number){
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(URL + '/tasks/'+id, {headers: headers});
    }


}