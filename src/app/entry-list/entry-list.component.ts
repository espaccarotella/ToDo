import { Component, Output, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Renderer2 } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
  providers: [TaskService]
})
export class EntryListComponent implements OnInit {
  
  public tasks: Task[] = [];
  @Output() edit_task = new EventEmitter<Task>();
  @ViewChildren('mylist') someDivs:any;
  public completed: string = '';

  constructor(
    private _taskService: TaskService,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.getTasks();
    this.renderer.listen("document", "submit", () => {
      this.getTasks();
    });

    const monitored_section = document.getElementById('entry-list');
  }

  addNewItem(task: Task){
    this.edit_task.emit(task);
  }

  getTasks(){
    this._taskService.getTasks().subscribe(
      response => {
        this.tasks = response;
        console.log(response);
      }
    );
  }

  updateTask(id:any, task: Task){
    this._taskService.updateTask(id, task).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  deleteTask(id:any){
    this._taskService.deleteTask(id).subscribe(
      response => {
        console.log(response);
        this.getTasks();
      }
    );
  }

  markAsCompleted(id:any, task: Task){
    task.complete = true;
    this._taskService.updateTask(id, task).subscribe(
      response => {
        console.log(response);
      }
    );
  }

}