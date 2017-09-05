import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { TodoComponent }    from './todo.component';

import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TodoRoutingModule
  ],
  declarations: [
    TodoComponent
  ],
  providers: []
})
export class TodoModule {}
