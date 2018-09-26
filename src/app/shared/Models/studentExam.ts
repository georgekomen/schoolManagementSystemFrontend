import {User} from './user';
import {Exam} from './exam';
import {StudentClasses} from './StudentClasses';
import {ExamSubjectResult} from './examSubjectResult';

export class StudentExam {
  id?: number;
  student?: User;
  exam?: Exam;
  studentClass?: StudentClasses;
  examSubjectResults?: ExamSubjectResult[];

}
