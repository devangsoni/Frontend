import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private userService: UserService,
    private spinnerService: Ng4LoadingSpinnerService

  ) { }
  userData;
  searchKeyWord;
  ngOnInit() {
  }

  serch() {
    this.spinnerService.show();
    this.userService.getUserByFirstName(this.searchKeyWord).subscribe((response) => {
      this.userData = response.data;
      this.spinnerService.hide();
    }, (err) => {

    });
  }
  delete() {
    this.userService.deleteUser();
    this.router.navigate(['login']);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
