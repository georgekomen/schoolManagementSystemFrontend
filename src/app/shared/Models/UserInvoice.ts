import {User} from './user';
import {UserReceipt} from './UserReceipt';
import {ClassInvoice} from './ClassInvoice';

export class UserInvoice {
  id?: number;
  date_created?: string;
  classInvoice?: ClassInvoice;
  invoice_amount?: number;
  invoiceTo?: 'SCHOOL_TO_USER' | 'USER_TO_SCHOOL';
  user?: User;
  name?: String;
  userReceipts?: UserReceipt;
}
