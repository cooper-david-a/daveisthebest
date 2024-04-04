import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginFormValidators } from './login-form.validators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.scss',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
})
export class LoginFormComponent implements OnInit {
  needToRegister = false;
  defaultMatcher = new DefaultErrorStateMatcher();
  passwordMatcher = new PasswordErrorStateMatcher();
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
      this.loginForm.addValidators([
        LoginFormValidators.confirmPasswordMatchesValidator,
      ]);
    } else {
      this.loginForm.removeControl('confirmPassword');
      this.loginForm.removeControl('email');
      this.loginForm.removeControl('firstName');
      this.loginForm.removeControl('lastName');
      this.loginForm.removeValidators([
        LoginFormValidators.confirmPasswordMatchesValidator,
      ]);
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

export class DefaultErrorStateMatcher implements ErrorStateMatcher {
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

export class PasswordErrorStateMatcher extends DefaultErrorStateMatcher {
  override isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    let passwordsDoNotMatch = form?.getError('passwordsDoNotMatch');
    return super.isErrorState(control, form) || passwordsDoNotMatch;
  }
}
