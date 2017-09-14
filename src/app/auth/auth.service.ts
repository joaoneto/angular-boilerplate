import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

export interface Credential {
  username: String;
  password: String;
}

export interface Authorization {
  user: {
    _id: String,
    name: String,
    username: String,
    email: String,
    gender?: String
  };
  token: String;
}

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  setAuthorization(authorization: Authorization): void {
    localStorage.authorizationData = authorization;
  }

  getAuthorization(): Authorization {
    return localStorage.authorizationData as Authorization;
  }

  getToken(): String | null {
    return this.getAuthorization().token;
  }

  isLoggedIn(): Boolean {
    return !!localStorage.getItem('authorizationData');
  }

  login(credential: Credential): Observable<any> {
    return this.http.post('https://my-app.com/api/authenticate', credential)
      .map((response: Response) => response.json() as Authorization)
      .map((authorization: Authorization) => {
        this.setAuthorization(authorization);
        return authorization;
      });
  }
}
