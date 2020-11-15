import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { UserService } from "../user.service";
import { User } from '../interfaces/user';
import { ROLES } from '../mocks/user-roles';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
    ) { }

  user: User;

  roles = ROLES;

  userForm = this.fb.group({
    _id: [''],
    role: ['', Validators.required],
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.email, Validators.required] ],
  });

  id:string = this.route.snapshot.paramMap.get('id');

  resetButtonText: string = "Limpar";
  backButtonText: string = "Voltar";
  

  ngOnInit(): void {
    if(this.id){
      this.getUser();
      this.userForm.patchValue(this.user);
    }
    // this.userForm.get('_id').disable(); /** TODO: automatic id from server */
  }

  getUser(): void {
    const id:string = this.id;
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
    console.warn('GET USER: ', this.user)
  }

  onSubmit() {
    console.warn(this.userForm.value);
    this.userService.updateUser(this.userForm.value)
      .subscribe(() => this.goBack())

    /** TODO: diferenciar new de update conforme _id*/
  }

  onReset(): void {
    this.userForm.reset();
  }
  goBack(): void {
    this.onReset();
    this.location.back();

  }

}
