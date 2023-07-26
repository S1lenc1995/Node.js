import {
  Body,
  Delete,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Header,
  Param,
  Post,
  Put,
  Redirect,
  ParseIntPipe,
  UseGuards,
  UsePipes,
  UseInterceptors,
  Res,
  NotFoundException
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto, UpdateRecordDto } from './dto/record.dto';
import { HashService } from 'src/common/hashService/hash.service';
import { ApiGuard } from './api_guard';
import { PostValidationPipe } from './record_validation_pipe';
import { CreateRecordSchema } from './dto/record.dto';
import { LoggingInterceptor } from './logging.interceptor';

@Controller('records')
@UseInterceptors(LoggingInterceptor) 
@UseGuards(ApiGuard)
export class RecordController {
  constructor(
    private readonly recordService: RecordService, 
    private readonly hashService: HashService
    ) { }

  @Get()
  async getAll() {
    return await this.recordService.getAll()
  }

 /*  @Get(':id')
  getOneUnDecoded(@Param('id', ParseIntPipe) id: number) {
    const record = this.recordService.getAll()[id - 1];
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    return { status: 200, data: record };
  }

  @Get(':id/decoded')
  getOneDecoded(@Param('id', ParseIntPipe) id: number) {
    const record = this.recordService.getAll()[id - 1];
    if (!record) {
      throw new NotFoundException('Record not found');
    }

    const decodedRecord = this.hashService.decodeRecord(record);
    return { status: 200, data: decodedRecord };
  } */

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  @UsePipes(new PostValidationPipe(CreateRecordSchema))
  async create(@Body() createPostDto: CreateRecordDto) {
    return await this.recordService.create(createPostDto);
  }

/*   @Put(':id')
  @UsePipes(new PostValidationPipe(CreateRecordSchema))
  update(@Body() updatePostDto: UpdateRecordDto, @Param('id', ParseIntPipe) id: number) {
    return { status: 200, data: this.recordService.update(id, updatePostDto)};
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return { status: 200, data: this.recordService.delete(id)};
  } */
}
