import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: any | '';
  admin: any | '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.isAdminLoggedIn()) {
      this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    }

    if (this.isVoterLoggedIn()) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('admin');
  }

  isVoterLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
