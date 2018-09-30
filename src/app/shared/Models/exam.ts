import {Course} from './course';
import {School} from './school';
import {ClassSubject} from './ClassSubject';

export class Exam {
  id?: number;
  course?: Course;
  school?: School;
  sitting_date?: string;
  examSubject?: ClassSubject[];
}
