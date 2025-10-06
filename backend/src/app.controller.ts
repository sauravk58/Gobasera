import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  getRoot() {
    return { status: 'ok', message: 'GoBasera backend is running 🚀' };
  }
  @Get('health') health() { return { ok: true, service: 'backend' }; }
}
