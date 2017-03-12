import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';

@Component({
    moduleId: module.id,
    selector: 'app-users',
    templateUrl: 'users.component.html'
})

export class UsersComponent implements OnInit {

    users: User[];
    addingUser = false;
    error: any;
    showNgFor = false;

    constructor(
        private userService: UserService
    ) { }

    getUsers(): void {
        this.userService
            .getUsers()
            .then(users => this.users = users)
            .catch(error => this.error = error);
    }
    addUser(): void {
        this.addingUser = true;
    }

    close(savedUser: User): void {
        this.addingUser = false;
        if (savedUser) {
            this.getUsers();
        }
    }
    ngOnInit(): void {
        this.getUsers();
    }
}
