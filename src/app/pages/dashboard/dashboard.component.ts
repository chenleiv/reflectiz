import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  users?: [];
  femaleUserCount: number;

  constructor() {}
  ngOnInit() {
    const users = JSON.parse((localStorage.getItem('users') as string) || '[]');
    this.users = users;
  }
}
