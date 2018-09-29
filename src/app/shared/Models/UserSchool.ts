import {User} from './user';
import {School} from './school';

export class UserSchool {
  id?: number;
  date_created?: string;
  status?: string;
  user?: User;
  school?: School;
}
