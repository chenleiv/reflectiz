import { Component, OnInit } from '@angular/core';
import { Types, User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-landing',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  userForm: FormGroup;
  startDate = new Date(1990, 0, 1);
  users: User[] = [];

  engine: Types[] = [
    { value: '1', viewValue: 'electric' },
    { value: '2', viewValue: 'fuel' },
  ];
  genders: Types[] = [
    { value: '1', viewValue: 'female' },
    { value: '2', viewValue: 'male' },
    { value: '3', viewValue: 'prefer not to say' },
  ];
  seats: Types[] = [
    { value: '1', viewValue: '3' },
    { value: '2', viewValue: '5' },
    { value: '3', viewValue: '7' },
  ];

  allHobbies: string[] = [
    'Reading',
    'Writing',
    'Traveling',
    'Cooking',
    'Sports',
    'Music',
    'Art',
    'Photography',
    'Dancing',
  ];
  selectedHobbies: string[] = [];
  filteredHobbies: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      color: ['', Validators.required],
      engine: ['', Validators.required],
      gender: ['', Validators.required],
      seats: ['', Validators.required],
      hobbies: [[]],
      birthDay: ['', Validators.required],
    });

    this.filteredHobbies = this.userForm.get('hobbies').valueChanges.pipe(
      startWith(''),
      map((value: string | null) =>
        value ? this._filter(value) : this.allHobbies.slice()
      )
    );
  }

  ngOnInit(): void {
    const user = localStorage.getItem('users');
    if (!user) {
      this.userService.getItems();
    }
  }

  getAge = () => {
    let a = moment(new Date());
    let b = moment(this.userForm?.value.birthDay);
    let day = a.diff(b, 'years');
    this.userForm.value.birthDate = day;
  };

  addOption(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.selectedHobbies.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.userForm.get('hobbies').setValue(null);
  }

  removeOption(option: string): void {
    const index = this.selectedHobbies.indexOf(option);

    if (index >= 0) {
      this.selectedHobbies.splice(index, 1);
    }
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedHobbies.push(event.option.viewValue);
    this.userForm.get('hobbies').setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value ? value.toString().toLowerCase() : '';
    return this.allHobbies.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.getAge();

      this.userForm.get('hobbies').setValue(this.selectedHobbies);
      const user: User = this.userForm.value;
      const users = JSON.parse(
        (localStorage.getItem('users') as string) || '[]'
      );
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      this.userForm.reset();
      Object.keys(this.userForm.controls).forEach((key) => {
        this.userForm.get(key).setErrors(null);
      });
      this.userService.showBottomError('Form submitted successfully');
    }
  }
}
