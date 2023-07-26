import { Injectable, Inject} from '@nestjs/common';
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
  ) {}

  async getAll(): Promise<RecordEntity[]> {
    return this.recordRepository.find()
  }

  async create(record: Record) {
    const encodeRecord = this.hashService.encodeRecord(record)
    const newRecordDB = this.recordRepository.create(encodeRecord);
    await this.recordRepository.save(newRecordDB)
    return newRecordDB.id
  }

/*   update(idToUpdate: number, updatedRecord) {
    let newRecord
    this.records.forEach((post, index) => {
      let decodeRecord = this.hashService.decodeRecord(post)
      if (decodeRecord.id == idToUpdate) {
        this.records[index] = this.hashService.encodeRecord({ ...decodeRecord, ...updatedRecord });
        newRecord = this.records[index]
      }
    });
    return newRecord
  }

  delete(idToDelete: number) {
    for (let i = 0; i < this.records.length; i++) {
      const decodeRecord = this.hashService.decodeRecord(this.records[i])
      console.log(decodeRecord)
      if (decodeRecord.id == idToDelete) {
        this.records.splice(i, 1);
        break;
      }
    }
    return idToDelete
  } */
}
