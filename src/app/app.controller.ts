import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from 'src/logger/logger.service';
import { ResponseUtil } from 'src/utils/response';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly logService: LoggerService) { }

    @Get()
    async getHello(): Promise<any> {
        try {
            this.logService.log('Controller logs', { key: 'value', nested: { array: [1, 2, 3] } })
            let data = await this.appService.getHello();
            return ResponseUtil.success('Getting welcome message successfully.', data);

        } catch (error) {
            this.logService.error('This is a log message', error)
        }
    }

    @Get('favicon.ico')
    getFavicon() { }
}
