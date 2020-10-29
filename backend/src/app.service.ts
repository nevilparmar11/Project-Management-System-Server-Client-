import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is a simple project management system. For more info, visit https://github.com/nevilparmar11/project-management-system';
  }
}
