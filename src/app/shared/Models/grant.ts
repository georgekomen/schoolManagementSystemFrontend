import {User} from './user';
import {Permission} from './permission';

export class Grant {
  id?: number;
  name?: String;
  employeeUser?: User;
  permission?: Permission;
}
