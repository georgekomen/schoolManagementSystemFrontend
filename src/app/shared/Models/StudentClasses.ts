import {User} from './user';
import {Class1} from './Class1';
import {StudentExam} from './studentExam';

export class StudentClasses{
  id?: number;
  student?: User;
  date_joined?: string;
  class1?: Class1;
  studentExams?: StudentExam[];
}
