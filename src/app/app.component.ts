import { Component } from '@angular/core';
import { Task } from './models/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  new_task: Task = new Task(0, '','', false);
  title = 'ToDo';

  setEdit(n_task: Task){
    this.new_task = n_task;
  }
}
