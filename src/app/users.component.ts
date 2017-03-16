import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';
// import { LoggerService } from './logger.service';

@Component({
  moduleId: module.id,
  selector: 'app-users',
  // providers: [UserService],
  templateUrl: 'users.component.html'
})

export class UsersComponent implements OnInit {

  users: User[];
  addingUser = false;
  error: any;
  selectedUser: User;

  constructor(
    private userService: UserService,
  ) { }

  getUsers(): void {
    this.userService
      .getUsers()
      .then(users => this.users = users)
      .catch(error => this.error = error);
  }
  addUser(): void {
    this.addingUser = true;
    this.selectedUser = null;
  }

  deleteUser(user: User, event: any): void {
    event.stopPropagation();
    this.userService
      .delete(user)
      .then(resp => {
        this.users = this.users.filter(usr => usr !== user);
        if (this.selectedUser === user) {
          this.selectedUser = null;
        }
      })
      .catch(error => this.error = error);
  }

  close(savedUser: User): void {
    this.addingUser = false;
    if (savedUser) {
      this.getUsers();

    }
  }

  onSelect(user: User): void {
    this.selectedUser = user;
    this.addingUser = false;
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
