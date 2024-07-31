import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPassword!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.forgotPassword = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.mustMatch('password', 'confirmPassword') });
  }

  onForgotPasswordSubmit() {
    if (this.forgotPassword.valid) {
      // Handle password reset logic here
    }
  }

  isInvalidInput(fieldName: string): boolean {
    return (
      this.forgotPassword.controls[fieldName].invalid &&
      (this.forgotPassword.controls[fieldName].dirty || this.forgotPassword.controls[fieldName].touched)
    );
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];
      
      if (confirmPassControl.errors && !confirmPassControl.errors?.['mustMatch']) {
        return;
      }

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }
}
