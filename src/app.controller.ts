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
}
