import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/hooks/sepay-webhook')
  sepayWebhook(@Body() body: Record<string, any>) {
    console.log('sepay-webhook body:', JSON.stringify(body, null, 2));
    return { success: true };
  }

  @Post('/hooks/sepay-qr')
  generateSepayQR(
    @Body()
    body: {
      bank: string;
      acc: string;
      amount: string;
      des: string;
      template: string;
    },
  ) {
    const params = new URLSearchParams({
      bank: body.bank,
      acc: body.acc,
      amount: body.amount,
      des: body.des,
      template: body.template,
    });
    const qrUrl = `https://qr.sepay.vn/img?${params}`;
    return qrUrl;
  }

  @Get('/hooks/sepay-transactions')
  async getTransactions() {
    const token =
      'PGQD2GS4CMUOJIYCQHQ07PTWLAMKEFIVBTHTY0XLEWUACGF7ZW5DABG1NNYVKFHV';

    const res = await fetch(
      'https://my.sepay.vn/userapi/transactions/list?limit=20',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await res.json();
    return data;
  }
}
