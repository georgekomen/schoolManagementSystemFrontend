import {User} from './user';
import {UserReceipt} from './UserReceipt';

export class UserInvoice {
  id?: number;
  date_created?: string;
  invoice_amount?: number;
  invoiceTo?: 'SCHOOL_TO_USER' | 'USER_TO_SCHOOL';
  user?: User;
  userReceipts?: UserReceipt;
}
