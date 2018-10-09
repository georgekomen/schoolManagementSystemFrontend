import {Course} from './course';
import {Subcounty} from './Subcounty';

export class School {
  name?: string;
  id?: number;
  date_registered?: string;
  courses?: Course[] = [];
  subCounty?: Subcounty;
  logoUrl?: string;
}
