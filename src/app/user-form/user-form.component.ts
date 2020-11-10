import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
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

  roles = ['admin', 'teacher', 'student'];

  userForm = this.fb.group({
    _id: [''],
    role: ['', Validators.required],
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.email],
  });
  

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.userForm.value);
    this.newUserEvent.emit(this.userForm.value)
  }







  


}
