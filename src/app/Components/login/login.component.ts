import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isInputFocused: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.loginForm = this.fb.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^(010|015|011|012)\\d{8}$'),
        ],
      ],
      password: ['', Validators.required],
    });

    // setTimeout(() => {
    //   if (this.authService.getUserId()) {
    //     this.router.navigate(['/']);
    //     this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً');
    //   }
    // }, 0);
  }

  onSubmit() {
    type DefaultFormData = {
      phoneNumber: string;
      password: string;
    };
    const defaultFormData: DefaultFormData = {
      phoneNumber: this.loginForm.value.phoneNumber,
      password: this.loginForm.value.password,
    };

    if (this.loginForm.valid) {
      this.authService.login(defaultFormData).subscribe({
        next: (data) => {
          console.log(`success ${data.token}`);
        },
        error: (err) => {
          console.error(err);
          this.openSnackBar('فشل تسجيل الدخول', 'حسناً');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
