import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * TOKEN key to persist
 */
const TOKEN = 'TTTOKEN';

/**
 * User role interface
 */
export interface UserRole {
  /**
   * Id of the user role
   */
  RoleId: number;
  /**
   * UserId of the user role
   */
  UserId: number;
  /**
   * Created date of the user role
   */
  createdAt: Date;
  /**
   * Updated date of the user role
   */
  updatedAt: Date;
}
/**
 * Role interface
 */
export interface Role {
  /**
   * Id of the role
   */
  id: number;
  /**
   * Name of the role
   */
  name: string;
  /**
   * Admin flag to check if role is admin role
   */
  isAdmin: boolean;
  /**
   * User roles assigned to the role
   */
  UserRoles: UserRole;
}

/**
 * Interface for branch of the user
 */
export interface UserBranch {
  /**
   * Id of the user branch
   */
  BranchId: number;
  /**
   * UserId of the user branch
   */
  UserId: number;
  /**
   * Created date of the user branch
   */
  createdAt: Date;
  /**
   * Updated date of the user branch
   */
  updatedAt: Date;
}

/**
 * Interface for Branch
 */
export interface Branch {
  /**
   * Id of the branch
   */
  id: number;
  /**
   * Name of the branch
   */
  name: string;
  /**
   * City of the branch
   */
  city: string;
  /**
   * User branches assigned to branch
   */
  UserBranches: UserBranch;
}

/**
 * Interface for User
 */
export interface User {
  /**
   * id of the user
   */
  id: number;
  /**
   * guid of the user
   */
  guid: string;
  /**
   * first name of the user
   */
  firstname: string;
  /**
   * last name of the user
   */
  lastname: string;
  /**
   * nickname of the user
   */
  username: string;
  /**
   * email address of the user
   */
  email: string;
  /**
   * status of the user
   */
  status: string;
  /**
   * created date for the user
   */
  createdAt: Date;
  /**
   * updated date for the user
   */
  updatedAt: Date;
  /**
   * Roles of the user
   */
  Roles: Role[];
  /**
   * Branches of the user
   */
  Branches: Branch[];
}

/**
 * Interface for the user response
 */
export interface UserResponse {
  /**
   * Token for the response
   */
  token: string;
  /**
   * User for the response
   */
  user: User;
}

/**
 * User service (for user Login, etc.)
 */
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

  /**
   * Method for persisting token
   * @param token Token to persist
   */
  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }
  /**
   * Method to check if user is logged in
   */
  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }

  /**
   * Method to log user in
   * @param username string to set username
   * @param password string to set password
   */
  login(username: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(environment.userBase + 'login', {
      username,
      password
    });
  }
}
