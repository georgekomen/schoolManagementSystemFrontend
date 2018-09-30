import {Course} from './course';
import {School} from './school';
import {Admission} from './Admission';
import {ClassSubject} from './ClassSubject';
import {ClassExam} from './ClassExam';

export class Class1 {
  id?: number;
  term?: 'ONE' | 'TWO' | 'THREE';
  school?: School;
  course?: Course;
  name?: string;
  start_date?: string;
  end_date?: string;
  classInvoices?: any;
  admission?: Admission;
  classSubjects?: ClassSubject[];
  classExams?: ClassExam[]
}
