import {Course} from './course';
import {School} from './school';
import {ExamSubject} from './examSubject';

export class Exam {
  id?: number;
  course?: Course;
  school?: School;
  sitting_date?: string;
  examSubject?: ExamSubject[];
}
