import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  signupForm = new FormGroup({});
  public flag = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private userService: UserService) {

    this.signupForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), Validators.required])],
      'firstName': ['', Validators.compose([Validators.minLength(2), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      'lastName': ['', Validators.compose([Validators.minLength(2), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      'password': ['',
        Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/), Validators.required])],
      'username': ['', Validators.required],
      'dateOfBirth': ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  register(signupForm) {
    this.flag = true;
    if (signupForm.valid) {
      this.spinnerService.show();
      const data = signupForm.value;
      const params = {
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        dateOfBirth: data.dateOfBirth
      };
      this.userService.register(params).subscribe((response) => {
        this.spinnerService.hide();
        alert(response.message);
        this.router.navigate(['login']);
      }, err => {
        this.spinnerService.hide();
        alert(err);
      });
    }
  }
}
