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
  constructor (private http: HttpClient) { }

  async ngOnInit () {
    this.todos = await this.handleApiCall(this.loadTodos(), 'Fehler beim Laden');
  }

  addTodo () {
    const url = environment.baseUrl + '/todos/';
    const user = localStorage.getItem('user_id');
    const body = { author: user, title: this.newTodo };

    this.http.post(url, body).subscribe(
      response => {
        this.todos.push(response);
        this.newTodo = '';
      },
      error => this.handleError(error)
    );
  }

  onCheckboxChange (event: any, todo: any) {
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

  loadTodos () {
    const url = `${environment.baseUrl}/todos/`;
    return lastValueFrom(this.http.get(url)
    );
  }


  deleteTodo (event: Event, id: number) {
    event.preventDefault();
  const url = environment.baseUrl + '/todos/' + id;

  this.http.delete(url).subscribe(
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
  
  async handleApiCall (apiCall: Promise<any>, errorMessage: string) {
    try {
      return await apiCall;
    } catch (e) {
      this.error = errorMessage;
      console.error('Error:', e);
    }
  }

  handleError (error: any) {
    console.error('Error:', error);
    this.error = 'An unexpected error occurred';
  }

}

