import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService, TaskElement } from '../services/data-service.service';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})

export class TableComponent implements OnInit {
  name: any;
  tasks: TaskElement[] = [];
  columns = [{ prop: 'name' }, { name: 'Description' }, { name: 'Date' }, { name: 'Status' }];
  
  constructor(public dataService: DataServiceService, public router:Router, public toastService: ToastService) { }
  
  ngOnInit(): void {
    this.tasks = [];
    this.dataService.getTasksStream().subscribe(data => {
      for(let task of data) this.tasks.push(task);
    })
  }
  deleteTask(){
    this.tasks = this.tasks.filter(t => t.name !== this.name);
    this.name = '';
  }
}
