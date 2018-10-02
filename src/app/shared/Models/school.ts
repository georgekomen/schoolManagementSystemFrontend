import {Course} from './course';

export class School {
  name?: string;
  id?: number;
  date_registered?: string;
  courses?: Course[] = [];
}
