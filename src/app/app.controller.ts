import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from 'src/logger/logger.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly logService: LoggerService) { }

    @Get()
    getHello(): any {
        try {
            this.logService.log('Controller logs', { key: 'value', nested: { array: [1, 2, 3] } })
            return this.appService.getHello();

        } catch (error) {
            this.logService.error('This is a log message', error)
        }
    }

    @Get('favicon.ico')
    getFavicon() { }
}
