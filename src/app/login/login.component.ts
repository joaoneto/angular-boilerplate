import { Component } from '@angular/core';
import { AuthService, Credential } from '../auth/auth.service';

@Component({
  template: `
    <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
      <input type="text" class="form-control" id="username" required>
      <input type="password" class="form-control" id="password" required>
      <button type="submit" class="btn btn-success">Login</button>
    </form>
  `
})

export class LoginComponent {
  constructor(public authService: AuthService) {
  }

  onSubmit() {
    // const credential = this.getCredential(loginForm);
    // this.authService.login();
  }
}
