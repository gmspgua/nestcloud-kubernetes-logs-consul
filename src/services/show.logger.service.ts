import { Injectable, Inject } from '@nestjs/common';
import { Interval } from '@nestcloud/schedule';
import { ConfigValue } from '@nestcloud/config';
import { AppLogger } from './logger.service'



@Injectable()
export class ShowLoggerService {

  @ConfigValue('silent', false)
  private readonly disableLog: boolean;

  @ConfigValue('level', 'error')
  private readonly configMapData: string;

  private readonly  correlationId = "123e4567-e89b-12d3-a456-426655440000";

  public constructor(private logger: AppLogger){
      this.logger.setContext(ShowLoggerService.name)
      this.logger.setUUid(this.correlationId)
      this.logger.setLevel(this.configMapData);
      this.logger.setLoggerOff(this.disableLog);
     }
  
  @Interval(1000)
  async intervalConsulConfigJob(uuid) {
    this.logger.setLevel(this.configMapData);
    this.logger.setLoggerOff(this.disableLog);

    this.logger.error(uuid);
    this.logger.warn( uuid);
    this.logger.log(uuid);
    this.logger.debug( uuid);
  
  }

}
