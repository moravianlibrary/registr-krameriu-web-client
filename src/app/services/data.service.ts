import { Injectable } from '@angular/core';
import { Record } from '../models/record.model';

@Injectable()
export class  DataService {
    data: Record[] = [];

    setData(data: any[]) {
        for (const item of data) {
            this.data.push(Record.build(item));
        }
        console.log('a', this.data[0]);
    }

    getRecordByCode(code: string) {
        let record: Record;
        for (const rec of this.data) {
            if (rec.code) {
                if (rec.code === code) {
                    record = rec;
                }
            }   
        }
        return record; 
    }
    getAllDocCount() {
        let i = 0;
        for (const rec of this.data) {
            if (rec.documents_all) {
                i = i + rec.documents_all;
            }
        }
        return i;
    }
    getPublicDocCount() {
        let i = 0;
        for (const rec of this.data) {
            if (rec.documents_public) {
                i = i + rec.documents_public;
            }
        }
        return i;
    }
}