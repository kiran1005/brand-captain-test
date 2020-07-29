import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from './modules/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'https://jsonplaceholder.typicode.com/posts';
  getUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  sendData(userDetails: UserData) {
    return this.http.post(this.url, userDetails);
  }

  updateProfile(id: string, userDetails: UserData) {
    const bearerToken = sessionStorage.getItem('bearerToken');
    return this.http.put(`https://just-auth-api.herokuapp.com/api/account/${id}`, userDetails, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
  }

  getData(): Observable<UserData> {
    const bearerToken = sessionStorage.getItem('bearerToken');
    return this.http.get<UserData>(this.getUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
  }

  loggedIn() {
    return !!sessionStorage.getItem('bearerToken');
  }

}
