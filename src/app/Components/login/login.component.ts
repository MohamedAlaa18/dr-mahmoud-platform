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
    private titleService: Title,
  ) { }

  ngOnInit() {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
        ],
      ],
      password: ['', Validators.required],
    });

    // Uncomment if you need to redirect authenticated users
    // setTimeout(() => {
    //   if (this.authService.getUserId()) {
    //     this.router.navigate(['/']);
    //     this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً');
    //   }
    // }, 0);
  }
  setCookie(name: string, value: string, days: number = 1) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  onSubmit() {
    const defaultFormData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    if (this.loginForm.valid) {
      this.authService.login(defaultFormData.email, defaultFormData.password).subscribe({
        next: (data) => {
          // Save user data in cookies
          const userData = data.content;
          this.setCookie('userToken', userData.token);
          this.setCookie('userEmail', userData.email);
          this.setCookie('userId', userData.id.toString());
          this.setCookie('walletBalance', userData.walletBalance.toString());
          this.setCookie('fullName', userData.fullName);
          this.setCookie('firstName', userData.firstName);
          this.setCookie('secondName', userData.secondName);
          this.setCookie('lastName', userData.lastName);
          this.setCookie('birthDate', userData.birthDate);
          this.setCookie('mobileNo', userData.mobileNo);
          this.setCookie('whatsAppNo', userData.whatsAppNo);
          this.setCookie('roles', JSON.stringify(userData.roles));
          this.setCookie('isActive', userData.isActive.toString());
          this.setCookie('passwordChanged', userData.passwordChanged.toString());
          this.setCookie('photoLink', userData.photoLink);

          this.router.navigate(['/']);
          this.snackBar.open('!نجح تسجيل الدخول', 'حسناً', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-success'
          });
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('فشل تسجيل الدخول', 'حسناً', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
