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
import { CreateRecordSchema, UpdateRecordSchema } from './dto/record.dto';
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

  @Get(':id')
  async getOneUnDecoded(@Param('id', ParseIntPipe) id: number) {
    const record = await this.recordService.getOne(id);
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    return record;
  }

  @Get(':id/decoded')
  async getOneDecoded(@Param('id', ParseIntPipe) id: number) {
    const record = await this.recordService.getOne(id);
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    const decodedRecord = this.hashService.decodeRecord(record.content)
    return decodedRecord
  } 

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  @UsePipes(new PostValidationPipe(CreateRecordSchema))
  async create(@Body() createPostDto: CreateRecordDto) {
    return await this.recordService.create(createPostDto);
  }

  @Put(':id')
 /*  @UsePipes(new PostValidationPipe(UpdateRecordSchema)) */
  update(@Body() updatePostDto: UpdateRecordDto, @Param('id', ParseIntPipe) id: number) {
    console.log(updatePostDto)
    return this.recordService.update(id, updatePostDto)
  }

   @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.recordService.delete(id);
  }  
}
