import { Component } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Todo } from '../models/todo.models';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todos: Todo[] = [
    new Todo(Guid.create(), 'Wash Car', false),
    new Todo(Guid.create(), 'Buy Grocery', false),
  ];
  // Submit form and It's Value to Guid;
  onSubmit(form: NgForm) {
    let todo = new Todo(Guid.create(), form.value.title, false);
    this.todos.push(todo);
    form.resetForm();
    this.check();
  };
// Calls when Complete task is clicked;
  onComplete(id: Guid) {
    let todo = this.todos.filter((x) => x.id === id)[0];
    todo.isComplete = true;
    this.check();
  };
// Delets the task;
  onDelete(id: Guid) {
    let todo = this.todos.filter((x) => x.id === id)[0];
    let index = this.todos.indexOf(todo, 0);
    if (index > -1) {
      this.todos.splice(index, 1);
    }
    this.check();
  };
  // Does undo and move the task to todo;
  onUndo(id: Guid) {
    let todo = this.todos.filter((x) => x.id === id)[0];
    todo.isComplete = false;
    this.check();
  };
  public showNo = false;
  public total = 0;
  // checks whether the all task is completed or not;
  check() {
    this.showNo=false;
    this.total = 0;
    var trueTotal = 0;
    for (let i of this.todos) {
      this.total += 1;
      if (i.isComplete == true) {
        trueTotal += 1;
      }
    }
    if (trueTotal == this.total) {
      this.showNo = true;
    };
  };
}
