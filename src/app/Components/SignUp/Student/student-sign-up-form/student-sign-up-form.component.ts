import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUserUpdateFormData } from 'src/app/Models/iuserUpdateForm';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { passwordMatched } from 'src/app/Validators/CrossfiledValidation';

@Component({
  selector: 'app-student-sign-up-form',
  templateUrl: './student-sign-up-form.component.html',
  styleUrls: ['./student-sign-up-form.component.css']
})
export class StudentSignUpFormComponent implements OnInit {
  isInputFocused: boolean = false;
  signupForm!: FormGroup;
  errorMeg: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private datePipe: DatePipe, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('^(?!\d).{4,}$')]],
      lastName: ['', Validators.required],
      studentPhoneNumber: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      fatherPhoneNumber: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      governorate: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['',],
      studentEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
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

  dateFilter = (date: Date | null): boolean => {
    const currentDate = new Date();
    return date ? date <= currentDate : true;
  }

  onSubmit() {
    const formattedDateOfBirth = this.datePipe.transform(this.signupForm.value.birthday, 'yyyy-MM-dd');

    if (this.signupForm.valid) {

      const defaultFormData: IUserUpdateFormData = {
        City: this.signupForm.value.governorate,
        confirmPassword: this.signupForm.value.confirmPassword,
        dateOfBirth: `${formattedDateOfBirth}`,
        Email: this.signupForm.value.studentEmail,
        FirstName: this.signupForm.value.fullName,
        gender: this.signupForm.value.gender,
        lastName: this.signupForm.value.lastName,
        ParentPhoneNumber: this.signupForm.value.fatherPhoneNumber,
        Password: this.signupForm.value.password,
        PhoneNumber: this.signupForm.value.studentPhoneNumber,
      };

      // Save data in DB
      this.authService.signUp(defaultFormData).subscribe(
        {
          next: (data) => {
            console.log(data)
            if (data.token) {
              this.authService.signUp(this.signupForm.value);
              this.router.navigate(['/login'])
              this._snackBar.open('تم انشاء الحساب بنجاح', 'حسناَ', {
                duration: 2000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                panelClass: 'snackbar-success'
              });
            }
          },
          error: (err) => {
            this.errorMeg = err.error.errors.msg;
            console.log(err);
          }
        })
    } else {
      Object.keys(this.signupForm.controls).forEach(controlName => {
        this.signupForm.get(controlName)?.markAsTouched();
      });
    }
  }
}
