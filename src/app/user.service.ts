import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
  private userUrl = 'http://localhost:8080/users';

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http
      .get(this.userUrl)
      .toPromise()
      .then(response => response.json().data as User[])
      .catch(this.handleError);
  }

  getUser(firstName: string): Promise<User> {
    return this.getUsers()
      .then(users => users.find(user => user.firstName === name));
  }

  save(user: User): Promise<User> {
    if (user.firstName) {
      return this.put(user);
    }
    return this.post(user);
  }

  delete(user: User): Promise<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = 'http://localhost:8080/users/16';

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  private post(user: User): Promise<User> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.userUrl, JSON.stringify(user), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private put(user: User): Promise<User> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = 'http://localhost:8080/users';

    return this.http
      .put(url, JSON.stringify(user), { headers: headers })
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error ', error);
    return Promise.reject(error.message || error);
  }
}
