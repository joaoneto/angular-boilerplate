import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { AuthService, Credential } from './auth.service';


describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        AuthService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it ('should get authorization token on login', () => {
    inject([AuthService, XHRBackend], (authService: AuthService, mockBackend: MockBackend) => {
      const token: String = 'abc-123';

      const mockResponse = {
        data: {
          user: {
            _id: 'user-1',
            name: 'Foo User',
            username: 'user'
          },
          token
        }
      };

      const credential: Credential = {
        username: 'user',
        password: '123'
      };

      mockBackend.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      authService.login(credential).subscribe((responseData: any) => {
        expect(responseData.token).toEqual(token);
      });

    });
  });
});
