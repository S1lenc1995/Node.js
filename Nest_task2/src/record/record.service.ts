import { Injectable } from '@nestjs/common';
import { Record } from './interfaces/record.interface';
import { HashService } from 'src/common/hashService/hash.service';

@Injectable()
export class RecordService {
  private records = [];
  constructor(private readonly hashService: HashService) { }

  getAll() {
    return this.records;
  }

  create(post: Record) {
    const id = this.records.length + 1;
    this.records.push(this.hashService.encodeRecord({ ...post, id }));
    return this.hashService.encodeRecord({ ...post, id })
  }

  update(idToUpdate: number, updatedRecord) {
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
  }
}
