import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  user: User;
  @Output() newUserEvent = new EventEmitter<any>();

  message = 'inicio';

  userForm = this.fb.group({
    name: [''],
    username: ['']
  });
  

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.userForm.value);
    this.newUserEvent.emit(this.userForm.value)
  }







  


}
