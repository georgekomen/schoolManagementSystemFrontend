import {Course} from './course';
import {School} from './school';
import {ClassSubject} from './ClassSubject';
import {ClassExam} from './ClassExam';
import {ClassInvoice} from './ClassInvoice';
import {Stream} from './Steam';

export class Class1 {
  id?: number;
  term?: 'ONE' | 'TWO' | 'THREE';
  course?: Course;
  name?: string;
  start_date?: string;
  end_date?: string;
  classInvoices?: ClassInvoice[];
  classSubjects?: ClassSubject[];
  classExams?: ClassExam[];
  streams?: Stream[];
}
