import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN = 'TTTOKEN';

export interface UserRole {
  RoleId: number;
  UserId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: number;
  name: string;
  isAdmin: boolean;
  UserRoles: UserRole;
}

export interface UserBranch {
  BranchId: number;
  UserId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Branch {
  id: number;
  name: string;
  city: string;
  UserBranches: UserBranch;
}
export interface User {
    id: number;
    guid: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    Roles: Role[];
    Branches: Branch[];
}

export interface UserResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Base url for requests
   */
  baseUrl = environment.baseUrl;

  /**
   * Constructor method
   * @param http client instance
   */
  constructor(private http: HttpClient) { }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }

  login(username: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(environment.userBase + 'login', {
      username,
      password
    });
  }
}
