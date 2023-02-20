export class User {
  name?: string;
  email?: string;
  date?: string;
  address?: string;
  city?: string;
  country?: string;
  color?: string;
  birthDate?: number;
  hobbies: string[];
  engine?: Types | string;
  seats?: Types | number;
  gender?: Types | string;
}

export interface Types {
  value?: string;
  viewValue?: string;
}
