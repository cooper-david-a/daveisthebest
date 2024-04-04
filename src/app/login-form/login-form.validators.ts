import { AbstractControl, ValidationErrors } from '@angular/forms';

export class LoginFormValidators {
  static confirmPasswordMatchesValidator(
    loginForm: AbstractControl
  ): ValidationErrors | null {
    let password = loginForm.get('password');
    let confirmPassword = loginForm.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : { passwordsDoNotMatch: true };
  }
}
