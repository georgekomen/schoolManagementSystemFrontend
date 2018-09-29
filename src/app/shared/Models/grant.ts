import {User} from './user';
import {Permission} from './permission';
import {School} from './school';

export class Grant {
  id?: number;
  name?: String;
  employeeUser?: User;
  permission?: Permission;
  school?: School;
}
