import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class AppService {
    constructor(private readonly logService: LoggerService) { }

    async getHello(): Promise<string> {
        this.logService.log('Service logs', { key: 'value', nested: { array: [1, 2, 3] } })
        return 'Hello World!';
    }
}
