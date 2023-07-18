import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RecordController } from "./record.controller";
import { RecordService } from "./record.service";
/* import { ApiKeyMiddleware } from 'src/middelware/ApiKeyMiddleware'; */

@Module({
    providers: [RecordService],
    controllers: [RecordController],
})
export class RecordModule {
    configure(consumer: MiddlewareConsumer) {
    /*     consumer.apply(ApiKeyMiddleware).forRoutes('records'); */
      }
}


  
  
  
  
  
  
  
  