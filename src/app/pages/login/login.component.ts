import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({});
  flag = false;

  constructor(
    private userService: UserService,
    private router: Router,
    public formBuilder: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login(loginForm) {
    this.flag = true;
    if (loginForm.valid) {
      this.spinnerService.show();
      const params = {
        username: loginForm.value.username,
        password: loginForm.value.password
      };
      this.userService.login(params).subscribe((response) => {
        this.spinnerService.hide();
        localStorage.setItem('token', response.data.token);
        this.router.navigate(['home']);
      }, err => {
        this.spinnerService.hide();
        alert(err);
      });
    }
  }
}
