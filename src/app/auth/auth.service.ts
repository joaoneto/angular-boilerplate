import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

export interface Credential {
  username: String,
  password: String
}

@Injectable()
export class AuthService {
  public token: String | null;

  constructor(private http: Http) {
  }

  getToken(): String | null {
    return this.token;
  }

  setToken(token: String): void {
    this.token = token;
  }

  unsetToken(): void {
    this.token = null;
  }

  login(credential: Credential): Observable<Object> {
    return this.http.post('https://my-app.com/api/authenticate', credential)
      .map(res => res.json())
      .map(responseData => {
        this.setToken(responseData.token);
        return responseData;
      });
  }
}
