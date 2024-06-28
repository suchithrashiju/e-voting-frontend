import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  user: any;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
}
