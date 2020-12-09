import { Module } from '@nestjs/common';
import { BootModule } from '@nestcloud/boot';
import { ConsulModule } from '@nestcloud/consul';
import { ConfigModule } from '@nestcloud/config';
import { ScheduleModule } from '@nestcloud/schedule';
import { BOOT, components, CONSUL } from '@nestcloud/common';
import { WinstonModule } from 'nest-winston';
import {AppLogger} from './services/logger.service';
import * as services from './services';
import { winstonConfig }  from './config/winston.config';
import { resolve } from 'path';
import { UserController } from './controller/user.controller';
import { ServiceModule } from '@nestcloud/service';




@Module({
  imports: [
    BootModule.forRoot({ filePath: resolve(__dirname, 'config.yaml') }),
    WinstonModule.forRoot(winstonConfig),
    ScheduleModule.forRoot(),
    ConsulModule.forRootAsync({ inject: [BOOT] }),
    ConfigModule.forRootAsync({ inject: [BOOT, CONSUL] }),
    ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
  ],
  controllers: components(UserController),
  providers: components(services, AppLogger),
})
export class AppModule {
}
