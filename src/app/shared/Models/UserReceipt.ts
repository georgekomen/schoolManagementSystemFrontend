import {User} from './user';
import {UserInvoice} from './UserInvoice';

export class UserReceipt {
  id?: number;
  payment_mode?: 'Mpesa' | 'Equity_bank' | 'KCB_bank';
  payment_date?: string;
  amount?: number;
  payTo?: 'SCHOOL_TO_USER' | 'USER_TO_SCHOOL';
  userInvoice?: UserInvoice;
}
