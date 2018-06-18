import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  userData;
  signupForm;
  flag = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,

  ) {
    this.signupForm = this.formBuilder.group({
      'email': ['',
        Validators.compose([Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), Validators.required])],
      'firstName': ['',
        Validators.compose([Validators.minLength(2), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      'lastName': ['',
        Validators.compose([Validators.minLength(2), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      'username': ['', Validators.required],
      'dateOfBirth': ['', Validators.required],
    });

  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe((response) => {
      this.userData = response.user;
      this.signupForm.controls['email'].setValue(this.userData.email);
      this.signupForm.controls['firstName'].setValue(this.userData.firstName);
      this.signupForm.controls['lastName'].setValue(this.userData.lastName);
      this.signupForm.controls['username'].setValue(this.userData.username);
      this.signupForm.controls['dateOfBirth'].setValue(this.userData.dateOfBirth);

    });
  }

  update(form) {
    this.flag = true;
    if (form.valid) {
      const data = form.value;
      const params = {
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        dateOfBirth: data.dateOfBirth
      };
      this.userService.editProfile(params).subscribe((response) => {
        console.log(response);
        alert(response.message);
        this.router.navigate(['home']);
      }, err => {
        alert(err);
      });
    }
  }

}
