import {ExamSubject} from './examSubject';
import {User} from './user';
import {StudentExam} from './studentExam';

export class ExamSubjectResult {
  id?: number;
  examSubject?: ExamSubject;
  student?: User;
  result_mark?: number;
  studentExam?: StudentExam;
}
