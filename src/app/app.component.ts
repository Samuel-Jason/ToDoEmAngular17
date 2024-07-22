import { RouterOutlet } from '@angular/router';
import { Todo } from '../models/todo.model';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppComponent {
  public mode: string = 'list';
  public todos: Todo[] = [];
  public menutitles: String = 'Minhas tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(11),
          Validators.required,
        ]),
      ],
    });

    this.load();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index != -1) {
      this.todos.splice(index, 1);
    }
  }

  markAsDone(todo: Todo) {
    todo.done = true;
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
  }

  //METODO QUE SALVAM NO LOCALSTORAGE E MOSTRA NA TELA
  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data !== null) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = []; // Inicializa this.todos como um array vazio se não houver dados salvos
      console.log('Não há dados salvos para "todos" no localStorage.');
    }
  }

  changeMode(mode: string) {
    this.mode = mode;  }
}
