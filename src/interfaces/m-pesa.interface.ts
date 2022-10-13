import { IsNotEmpty } from 'class-validator';

export interface c2b {
  input_Amount: number;
  input_Country: string;
  input_Currency: 'TZS';
  input_CustomerMSISDN: number | string;
  input_ServiceProviderCode: number | string;
  input_ThirdPartyConversationID: string;
  input_TransactionReference: string;
  input_PurchasedItemsDesc: string;
}

export class PayloadBody {
  @IsNotEmpty({ message: 'Phone number can not be empty' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Amount can not be empty' })
  amount: number;

  item: string;
}
