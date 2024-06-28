import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  year: number = new Date().getFullYear();

  constructor(private router: Router) {}
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('admin');
  }

  isVoterLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
