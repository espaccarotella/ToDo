import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css'],
  providers: [TaskService]
})
export class DataEntryComponent implements OnInit {
  
  @Input() public new_task: Task;
  public status: string = '';

 
  constructor( 
    private _taskService: TaskService) {
    this.new_task = new Task(0, '', '', false);
  }
    
  ngOnInit(): void {

  }

  onSubmit(form:any){ 
    this._taskService.saveTask(this.new_task).subscribe(
      response => {
        if(response.status){
          this.status = 'success';
          console.log(this.status);
        }
        else{
          this.status = 'failed';
        }
      }
    );
    form.reset();
    this.new_task.id = 0;
  }

}
