import {User} from './user';
import {StudentExam} from './studentExam';
import {Subject1} from './Subject1';

export class StudentExamResult {
  id?: number;
  subject?: Subject1;
  user?: User;
  result_mark?: number;
  studentExam?: StudentExam;
}
