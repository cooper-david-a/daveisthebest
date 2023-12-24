import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  needToRegister = false;
  matcher = new MyErrorStateMatcher();
  loginForm = new FormGroup<LoginForm>({
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(private authService: AuthService) {}

  login() {
    if (this.loginForm.valid) {
      let username = this.loginForm.value.username
        ? this.loginForm.value.username
        : '';
      let password = this.loginForm.value.password
        ? this.loginForm.value.password
        : '';
      let email = this.loginForm.value.email ? this.loginForm.value.email : '';
      if (this.needToRegister) {
        this.authService.createUser({
          username: username,
          email: email,
          password: password,
        });
      } else {
        this.authService.login(username, password);
      }
    }
  }

  registerOrLogin() {
    this.needToRegister = !this.needToRegister;
    if (this.needToRegister) {
      this.loginForm.addControl(
        'confirmPassword',
        new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        })
      );
      this.loginForm.addControl(
        'email',
        new FormControl<string>('', {
          validators: [Validators.email, Validators.required],
          nonNullable: true,
        })
      );
    } else {
      this.loginForm.removeControl('confirmPassword');
      this.loginForm.removeControl('email');
    }
  }
}

interface LoginForm {
  username: FormControl<string>;
  email?: FormControl<string>;
  password: FormControl<string>;
  confirmPassword?: FormControl<string>;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      !control.pristine &&
      (control.touched || isSubmitted)
    );
  }
}
