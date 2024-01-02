import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
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
  returnUrl!: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (this.loginForm.valid) {
      let username = this.loginForm.value.username
        ? this.loginForm.value.username
        : '';
      let password = this.loginForm.value.password
        ? this.loginForm.value.password
        : '';
      let email = this.loginForm.value.email ? this.loginForm.value.email : '';
      let firstName = this.loginForm.value.firstName
        ? this.loginForm.value.firstName
        : '';
      let lastName = this.loginForm.value.lastName
        ? this.loginForm.value.lastName
        : '';
      if (this.needToRegister) {
        this.authService
          .register({
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
          })
          .subscribe((tokens) => {
            this.needToRegister = false;
          });
      } else {
        this.authService.login(username, password).subscribe((tokens) => {
          this.router.navigate([this.returnUrl]);
        });
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
        'firstName',
        new FormControl<string>('', {
          validators: [],
          nonNullable: true,
        })
      );
      this.loginForm.addControl(
        'lastName',
        new FormControl<string>('', {
          validators: [],
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
      this.loginForm.removeControl('firstName');
      this.loginForm.removeControl('lastName');
    }
  }
}

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
  firstName?: FormControl<string>;
  lastName?: FormControl<string>;
  email?: FormControl<string>;
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
      control.dirty &&
      (control.touched || isSubmitted)
    );
  }
}
