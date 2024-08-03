import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

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
    private cookieService: CookieService
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
          this.cookieService.set('userToken', userData.token);
          this.cookieService.set('userEmail', userData.email);
          this.cookieService.set('userId', userData.id.toString());
          this.cookieService.set('walletBalance', userData.walletBalance.toString());
          this.cookieService.set('fullName', userData.fullName);
          this.cookieService.set('firstName', userData.firstName);
          this.cookieService.set('secondName', userData.secondName);
          this.cookieService.set('lastName', userData.lastName);
          this.cookieService.set('birthDate', userData.birthDate);
          this.cookieService.set('mobileNo', userData.mobileNo);
          this.cookieService.set('whatsAppNo', userData.whatsAppNo);
          this.cookieService.set('roles', JSON.stringify(userData.roles));
          this.cookieService.set('isActive', userData.isActive.toString());
          this.cookieService.set('passwordChanged', userData.passwordChanged.toString());
          this.cookieService.set('photoLink', userData.photoLink);

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
