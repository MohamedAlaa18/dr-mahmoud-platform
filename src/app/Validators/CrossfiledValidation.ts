import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatched: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ unMatchedPassword: true });
    return { unMatchedPassword: true };
  } else {
    confirmPassword?.setErrors(null);
    return null;
  }
};
