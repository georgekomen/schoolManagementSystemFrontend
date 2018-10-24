import {User} from './user';
import {StudentExamResult} from './StudentExamResult';
import {ClassExam} from './ClassExam';

export class StudentExam {
  id?: number;
  user?: User;
  sitting_date?: string;
  name?: string;
  classExam?: ClassExam;
  studentExamResults?: StudentExamResult[];
}
