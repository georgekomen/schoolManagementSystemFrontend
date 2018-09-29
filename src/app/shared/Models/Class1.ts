import {Course} from './course';
import {School} from './school';

export class Class1 {
  id?: number;
  term?: 'ONE' | 'TWO' | 'THREE';
  school?: School;
  course?: Course;
  start_date?: string;
  end_date?: string;

}
