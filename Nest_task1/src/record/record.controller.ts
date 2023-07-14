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
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto, UpdateRecordDto } from './dto/record.dto';
import { HashService } from 'src/common/hashService/hash.service';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService, private readonly hashService: HashService) { }

  @Get()
  getAll() {
    return this.recordService.getAll();
  }

  @Get(':id')
  getOneUnDecoded(@Param('id') id: number) {
    return this.recordService.getAll()[id - 1];
  }

  @Get(':id/decoded')
  getOneDecoded(@Param('id') id: number) {
    return this.hashService.decodeRecord(this.recordService.getAll()[id - 1]);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createPostDto: CreateRecordDto) {
    return this.recordService.create(createPostDto);
  }

  @Put(':id')
  update(@Body() updatePostDto: UpdateRecordDto, @Param('id') id: number) {
    return this.recordService.update(id, updatePostDto)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.recordService.delete(id);
  }
}
