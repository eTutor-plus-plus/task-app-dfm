import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('actuator')
@ApiTags('actuator')
export class HealthControllerController {
  @Get()
  async listEndpoints() {
    return {
      _links: {
        property1: {
          href: '/actuator/health',
        },
      },
    };
  }

  @Get('/health')
  async getHealthMetrics() {
    return {
      status: 'UP',
    };
  }
}
