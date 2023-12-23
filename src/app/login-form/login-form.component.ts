import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  needToRegister = false;
  loginForm = new FormGroup<LoginForm>({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(private authService: AuthService) {}

  login() {
    if (this.loginForm.valid) {
    }
  }

  registerOrLogin() {
    this.needToRegister = !this.needToRegister;
    if (this.needToRegister) {
      this.loginForm.addControl(
        'confirmPassword',
        new FormControl<string>('', {
          validators: [Validators.required],
        })
      );
    } else {
      this.loginForm.removeControl('confirmPassword');
    }
    
    //kinda hacky but confirmPassword is created ofter this runs otherwise
    setTimeout(
      () =>
        Object.keys(this.loginForm.controls).forEach((key) =>
          this.loginForm.get(key)?.setErrors(null)
        ),
      1
    );
  }
}

interface LoginForm {
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword?: FormControl<string | null>;
}
