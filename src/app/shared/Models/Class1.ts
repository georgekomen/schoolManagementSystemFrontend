import {Course} from './course';
import {School} from './school';
import {Admission} from './Admission';
import {ClassSubject} from './ClassSubject';
import {ClassExam} from './ClassExam';
import {ClassInvoice} from './ClassInvoice';

export class Class1 {
  id?: number;
  term?: 'ONE' | 'TWO' | 'THREE';
  school?: School = new School();
  course?: Course = new Course();
  name?: string;
  start_date?: string;
  end_date?: string;
  classInvoices?: ClassInvoice[] = [];
  admission?: Admission = new Admission();
  classSubjects?: ClassSubject[] = [];
  classExams?: ClassExam[] = [];
}
