import { ReflectiveInjector } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AuthService, Credential, Authorization } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      AuthService
    ]);

    this.authService = this.injector.get(AuthService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('should get authorization on login', fakeAsync(() => {
    const token: String = 'abc-123';
    const mockResponse: Authorization = {
      user: {
        _id: 'user-1',
        name: 'Foo User',
        username: 'user',
        email: 'user@email.com'
      },
      token
    };
    const credential: Credential = {
      username: 'user',
      password: '123'
    };

    let result: any;

    this.authService.login(credential).subscribe((responseData: Response) => result = responseData);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(mockResponse)
    })));

    tick();

    expect(this.lastConnection.request.url).toMatch(/\/api\/authenticate$/, 'url invalid');
    expect(result.token).toEqual(token);
  }));

  it('should authorization getToken undefined', fakeAsync(() => {
    const result = this.authService.getToken();
    expect(result).toBeUndefined();
  }));

  it('should authorization getToken', fakeAsync(() => {
    const token: String = 'abc-123';
    const mockResponse: Authorization = {
      user: {
        _id: 'user-1',
        name: 'Foo User',
        username: 'user',
        email: 'user@email.com'
      },
      token
    };
    const credential: Credential = {
      username: 'user',
      password: '123'
    };

    this.authService.login(credential);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(mockResponse)
    })));

    tick();

    const result = this.authService.getToken();
    expect(result).toEqual(token);
  }));
});
