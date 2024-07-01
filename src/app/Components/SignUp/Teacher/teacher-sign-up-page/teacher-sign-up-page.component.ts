import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-teacher-sign-up-page',
  templateUrl: './teacher-sign-up-page.component.html',
  styleUrls: ['./teacher-sign-up-page.component.css']
})
export class TeacherSignUpPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    setTimeout(() => {
      if (this.authService.getUserId()) {
        this.router.navigate(['/']);
        this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً');
      }
    }, 0);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
