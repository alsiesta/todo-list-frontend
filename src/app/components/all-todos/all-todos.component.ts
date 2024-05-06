import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpHeaders } from '@azure/storage-blob';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})

export class AllTodosComponent {
  todos: any = [];
  error = '';
  newTodo = '';

addTodo() {
  const url = environment.baseUrl + '/todos/';
  const user = localStorage.getItem('user_id');
  const body = { author: user, title: this.newTodo };
  console.log(body);

  this.http.post(url, body).subscribe(
    response => {
      console.log(response);
      this.loadTodos().then(todos => {
        this.todos = todos;
      } 
      );
    },
    error => {
      console.error('Error:', error);
    }
  );
}
  
onCheckboxChange(event: any, todo: any) {
  const url = environment.baseUrl + '/todos/' + todo.id + '/';
  const updatedTodo = { ...todo, checked: event.target.checked };

  this.http.put(url, updatedTodo).subscribe(
    response => {
      console.log(response);
      this.loadTodos().then(todos => {
        this.todos = todos;
      });
    },
    error => {
      console.error('Error:', error);
    }
  );
}

  constructor (private http: HttpClient) { }

  async ngOnInit () {
    try {
      this.todos = await this.loadTodos();
      console.log(this.todos);
    } catch (e) {
      this.error = 'Fehler beim laden';
      console.error('Error:', e);
    }
  }

  loadTodos () {
    const url = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get(url)
    );
  }

}

