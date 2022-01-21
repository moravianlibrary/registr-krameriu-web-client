import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Record } from './record.model';

@Injectable()
export class  DataService {
    data: Record[] = [];

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