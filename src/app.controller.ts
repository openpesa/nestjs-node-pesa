import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { PayloadBody } from './interfaces/m-pesa.interface';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  getStatus(): { status: string } {
    return { status: 'Ok' };
  }

  @Post('transactions')
  async createTransaction(@Body() body: PayloadBody, @Res() res: any) {
    const transaction = await this.appService.createTransaction(body);
    return res.status(transaction.status).send(transaction);
  }
}
