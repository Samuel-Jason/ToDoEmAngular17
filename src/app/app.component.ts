import { RouterOutlet } from '@angular/router';
import { Todo } from '../models/todo.model';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppComponent {
  public todos: Todo[] =	[];
  public menutitles: String = 'Minhas tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      title: ['',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(11),
          Validators.required,
      ])]
    });
  }

  add(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.clear();
  }

  clear(){
    this.form.reset();
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
