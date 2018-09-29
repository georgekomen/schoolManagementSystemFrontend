import {Identification} from './Identification';
import {School} from './school';
import {Admission} from './Admission';
import {Course} from './course';
import {StudentClasses} from './StudentClasses';
import {UserInvoice} from './UserInvoice';
import {Grant} from './grant';
import {UserSchool} from './UserSchool';

export class User {
  id?: number;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  identifications?: Identification[];
  gender?: string;
  email?: string;
  phoneNumber?: string;
  userSchools?: UserSchool[];
  admission?: Admission;
  course?: Course;
  studentClasses?: StudentClasses[];
  status?: string;
  grants?: Grant[];
  userInvoices?: UserInvoice[];
}
