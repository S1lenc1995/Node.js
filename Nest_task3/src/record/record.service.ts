import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Record } from './interfaces/record.interface';
import { HashService } from 'src/common/hashService/hash.service';
import { Repository } from 'typeorm';
import { Record as RecordEntity } from '../database/entity/record/record.entity';


@Injectable()
export class RecordService {

  constructor(


    @Inject('RECORD_REPOSITORY')
    private recordRepository: Repository<RecordEntity>,
    private readonly hashService: HashService,
  ) { }

  async getAll(): Promise<RecordEntity[]> {
    return this.recordRepository.find()
  }

  async getOne(id: number): Promise<RecordEntity> {
    const record = await this.recordRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    return record;
  }

  async create(record: Record) {
    const encodeRecord = this.hashService.encodeRecord(record)
    const newRecordDB = this.recordRepository.create(encodeRecord);
    await this.recordRepository.save(newRecordDB)
    return newRecordDB.id
  }

  async update(idToUpdate: number, updatedRecord: Partial<Record>): Promise<RecordEntity> {
    let recordToUpdate = await this.getOne(idToUpdate);
    recordToUpdate = this.hashService.decodeRecord(recordToUpdate.content)
    Object.assign(recordToUpdate, updatedRecord);
    const encodeRecord = this.hashService.encodeRecord(recordToUpdate)
    await this.recordRepository.update(idToUpdate , encodeRecord)
    return recordToUpdate;
  }

  async delete(idToDelete: number) {
    await this.recordRepository.delete(idToDelete);
    return idToDelete
  }
}
