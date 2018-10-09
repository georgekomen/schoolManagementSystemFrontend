import {Country} from './Country';
import {Subcounty} from './Subcounty';

export class County {
  id?: number;
  name?: string;
  country?: Country;
  subCounties?: Subcounty[];
}
