import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Models/iuser';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { passwordMatched } from 'src/app/Validators/CrossfiledValidation';

@Component({
  selector: 'app-student-sign-up-form',
  templateUrl: './student-sign-up-form.component.html',
  styleUrls: ['./student-sign-up-form.component.css'],
  providers: [DatePipe]  // Provide DatePipe here
})
export class StudentSignUpFormComponent implements OnInit {
  isInputFocused: boolean = false;
  signupForm!: FormGroup;
  errorMeg: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private datePipe: DatePipe,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^(?!\d).{4,}$')]],
      secondName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      whatsAppNo: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required],
    }, { validators: passwordMatched });
  }

  isPasswordInvalid() {
    return this.signupForm.get('password')?.invalid && (this.signupForm.get('password')?.dirty || this.signupForm.get('password')?.touched);
  }

  passwordStrengthValidator(control: any) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (control.value && !regex.test(control.value)) {
      return { 'weakPassword': true };
    }
    return null;
  }

  // Returns a CSS class for the given date
  dateClass = (d: Date | null): string => {
    const currentDate = new Date();
    return d && d > currentDate ? 'disabled-date' : '';
  }

  onSubmit() {
    const birthDate = this.signupForm.value.birthDate;
    const formattedDateOfBirth = birthDate.toISOString();

    if (this.signupForm.valid) {
      const formData: IUser = {
        firstName: this.signupForm.value.firstName,
        secondName: this.signupForm.value.secondName,
        lastName: this.signupForm.value.lastName,
        birthDate: formattedDateOfBirth,
        mobileNo: this.signupForm.value.mobileNo,
        email: this.signupForm.value.email,
        whatsAppNo: this.signupForm.value.whatsAppNo,
        password: this.signupForm.value.password,
      };
      console.log(formData)
      // Save data in DB
      this.authService.register(formData).subscribe({
        next: (data) => {
          console.log("data : ", data)
          if (data) {
            this.router.navigate(['/login']);
            this.snackBar.open('تم انشاء الحساب بنجاح', 'حسناَ', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-success'
            });
          }
        },
        error: (err) => {
          if (err.error && err.error.errors) {
            this.errorMeg = err.error.errors.msg;
          } else {
            this.errorMeg = 'An unknown error occurred';
          }
          console.log(this.errorMeg);
        }
      });
    } else {
      Object.keys(this.signupForm.controls).forEach(controlName => {
        this.signupForm.get(controlName)?.markAsTouched();
      });
    }
  }
}
