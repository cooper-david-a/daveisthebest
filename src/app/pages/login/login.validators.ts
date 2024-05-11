import { AbstractControl, ValidationErrors } from '@angular/forms';

export class LoginValidators {
  static confirmPasswordMatchesValidator(
    loginForm: AbstractControl
  ): ValidationErrors | null {
    let password = loginForm.get('password');
    let confirmPassword = loginForm.get('confirmPassword');
    return password?.value === confirmPassword?.value
      ? null
      : { passwordsDoNotMatch: true };
  }
}
