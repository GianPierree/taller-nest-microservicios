import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola Mundo desde AWS Lambda - Serverless - GitActions';
  }
}
