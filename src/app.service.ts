import { Injectable } from '@nestjs/common';
import { Pesa } from '@openpesa/pesa-js';
import { c2b, PayloadBody } from './interfaces/m-pesa.interface';

@Injectable()
export class AppService {
  createTransaction = async (body: PayloadBody) => {
    try {
      const payload = this.sanitiseRequest(body);

      const pesa = this.pesaInstance();

      const transaction = await pesa.c2b(payload);
      return transaction;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  /**
   * @method pesaInstance a method to instantiate a new { Pesa } instance
   */
  pesaInstance = () => {
    return new Pesa(
      {
        api_key: process.env.M_PESA_SESSION_KEY,
        public_key: process.env.PUBLIC_KEY,
      },
      process.env.M_PESA_ENV === 'PROD' ? 'production' : 'sandbox',
    );
  };

  /**
   * @method sanitizeRequest a method to create a { Pesa } acceptable payload
   */
  sanitiseRequest = (body: PayloadBody): c2b => {
    return {
      input_Amount: body.amount,
      input_CustomerMSISDN: body.phoneNumber,
      input_Country: 'TZN',
      input_Currency: 'TZS',
      input_PurchasedItemsDesc: body.item,
      input_ThirdPartyConversationID:
        process.env.M_PESA_ENV === 'PROD'
          ? process.env.M_PESA_CONVERSATION_ID
          : '1e9b774d1da34af78412a598cbc28f5d',
      input_TransactionReference:
        process.env.M_PESA_ENV === 'PROD'
          ? process.env.M_PESA_TRANSACTION_REF
          : 'T12344Z',
      input_ServiceProviderCode:
        process.env.M_PESA_ENV === 'PROD'
          ? process.env.M_PESA_SERVICE_PROVIDER_CODE
          : '000000',
    };
  };
}
