import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
    selectedUser!: User;
    users!: User[];
    private baseURL = 'http://localhost:3000'
    private usersURL = 'http://localhost:3000/api/getUsers';
    private apiURL = 'http://localhost:3000/api/users'
  
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'})
    };
  
    constructor(private http: HttpClient) {
    
    }
  
    updateUser(user: User){
      return this.http.get(`${this.apiURL}/${user._id}`) 
    }
  }
  