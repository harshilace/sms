import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from '../config/app.config';
import { databaseConfig } from '../config/database.config';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
    imports: [
        ConfigModule.forRoot(appConfig),
        TypeOrmModule.forRoot(databaseConfig),
        LoggerModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
