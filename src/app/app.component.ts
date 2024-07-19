import { RouterOutlet } from '@angular/router';
import { Todo } from '../models/todo.model';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppComponent {
  public todos: Todo[] =	[];
  public titles: String = 'Minhas tarefas';

  constructor() {
    this.todos.push(new Todo(1, 'Passear com cachorrow', true));
    this.todos.push(new Todo(1, 'Ir ao mercado', true));
    this.todos.push(new Todo(1, 'Cortar o cabelo', false));
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index != -1){
      this.todos.splice(index, 1);
    }
  }

  markAsDone(todo: Todo){
    todo.done = true;
  }

  markAsUndone(todo : Todo){
    todo.done = false;
  }

}
