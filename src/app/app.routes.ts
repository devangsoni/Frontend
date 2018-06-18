import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const AppRoutes: Routes =
  [
    {
      path: '',
      component: LandingPageComponent,

    }, {
      path: 'signup',
      component: SignupPageComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'profile',
      component: ProfilePageComponent,
    },
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: '**',
      component: LandingPageComponent,
    }
  ];
