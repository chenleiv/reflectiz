import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public snackBar: MatSnackBar) {}

  private _userDb: User[] = [
    {
      name: 'Sheldon copper',
      gender: 'male',
      email: 'sheldon@gmail.com',
      birthDate: 32,
      address: '26782 st.',
      city: 'Los Angeles',
      country: 'USA',
      color: '#0000',
      seats: 7,
      engine: 'electric',
      hobbies: ['Reading', 'Writing'],
    },
    {
      name: 'Leonard Hofstadter',
      gender: 'male',
      email: 'leonardof@gmail.com',
      birthDate: 36,
      address: 'Gordon',
      city: 'Tel-Aviv',
      country: 'Israel',
      color: '#hg439',
      seats: 5,
      engine: 'electric',
      hobbies: ['Sports', 'Music'],
    },
    {
      name: 'Penny Hofstadter',
      gender: 'female',
      email: 'penny34@gmail.com',
      birthDate: 26,
      address: 'Dizengoff',
      city: 'Tel-Aviv',
      country: 'Israel',
      color: '#345rr',
      seats: 5,
      engine: 'fuel',
      hobbies: ['Reading', 'Music'],
    },
    {
      name: 'Amy Farrah Fowler',
      gender: 'female',
      email: 'Farrah2@gmail.com',
      birthDate: 30,
      address: 'dd',
      city: 'Los Angeles',
      country: 'USA',
      color: '#345',
      seats: 5,
      engine: 'electric',
      hobbies: ['Cooking', 'Music'],
    },
    {
      name: 'Raj Koothrappali',
      gender: 'male',
      email: 'ssss1@gmail.com',
      birthDate: 32,
      address: 'Nachalat Binyamin',
      city: 'Tel-Aviv',
      country: 'Israel',
      color: '#345',
      seats: 5,
      engine: 'fuel',
      hobbies: ['Sports', 'Music'],
    },
    {
      name: 'Howard Wolowitz',
      gender: 'prefer not to say',
      email: 'ssss1@gmail.com',
      birthDate: 35,
      address: 'Rothschild',
      city: 'Jerusalem',
      country: 'Israel',
      color: '#345',
      seats: 5,
      engine: 'electric',
      hobbies: ['Traveling', 'Sports'],
    },
    {
      name: 'Bernadette Rostenkowski-Wolowitz',
      gender: 'female',
      email: 'ssss1@gmail.com',
      birthDate: 35,
      address: 'Rothschild',
      city: 'Herzelia',
      country: 'Israel',
      color: '#345',
      seats: 3,
      engine: 'electric',
      hobbies: ['Traveling', 'Sports'],
    },
  ];

  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();

  public getItems() {
    const users = this._userDb;
    localStorage.setItem('users', JSON.stringify(users));
    this._users$.next(users);
  }

  public showBottomError(message: string): void {
    this.snackBar.open(message, 'X', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: 'error-snack',
      duration: 10 * 1000,
    });
  }
}
