import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordController } from './record/record.controller';
import { RecordModule } from './record/record.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, RecordModule],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule { }
