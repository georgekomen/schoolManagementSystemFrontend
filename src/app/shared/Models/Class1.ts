import {Course} from './course';
import {School} from './school';

export class Class1 {
  id?: number;
  term?: 'ONE' | 'TWO' | 'THREE';
  academicYear?: string;
  school?: School;
  course?: Course;

}