import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from 'src/logger/logger.service';
import { successResponse, errorResponse } from 'src/utils/response';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly logService: LoggerService) { }

    @Get()
    async getHello(): Promise<any> {
        try {
            this.logService.log('Controller logs', { key: 'value', nested: { array: [1, 2, 3] } })
            let data = await this.appService.getHello();
            return successResponse('Getting welcome message successfully.', data);

        } catch (error) {
            this.logService.error('This is a log message', error)
            return errorResponse('error coming in hello function');
        }
    }

    @Get('favicon.ico')
    getFavicon() { }
}
