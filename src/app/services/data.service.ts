import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Record } from './record.model';

@Injectable()
export class  DataService {
    data: Record[] = [];
    // record: Record;

    setData(data: Record[]) {
        this.data = data;
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
}