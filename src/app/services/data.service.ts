import { Injectable } from '@angular/core';
import { Record } from '../models/record.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class  DataService {
    constructor(public translate: TranslateService) {}

    data: Record[] = [];

    setData(data: any[]) {
        for (const item of data) {
            this.data.push(Record.build(item));
        }
        // console.log('a', this.data[0]);
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
    getAllPagesCount() {
        let i = 0;
        for (const rec of this.data) {
            if (rec.pages_all) {
                i = i + rec.pages_all;
            }
        }
        return i;
    }
    getPublicPagesCount() {
        let i = 0;
        for (const rec of this.data) {
            if (rec.pages_public) {
                i = i + rec.pages_public;
            }
        }
        return i;
    }
    unixDurationToHuman(t: number) {
        let newT = '';
        let duration = t;
    
        let years: number;
        let months: number;
        let days: number;
        let hours: number;
        let minutes: number;
    
        let year: number = 31556926;
        let month: number = 2629743;
        let day: number = 86400;
        let hour: number = 3600;
        let minute: number = 60;
    
        // if (duration > year) {
        //   years = Math.floor(duration/year);
        //   if (years == 1) {
        //     newT =  years.toString() +  ' ' + this.translate.instant('graph.year')
        //   }
        //   else if (years > 1 && years < 5) {
        //     newT = years.toString() +  ' ' + this.translate.instant('graph.years2-4')
        //   }
        //   else {
        //     newT = years.toString() +  ' ' + this.translate.instant('graph.years5+')
        //   }
        //   duration = duration - (year * years);
        // }
        // if (duration > month) {
        //   months = Math.floor(duration/month);
        //   if (months == 1) {
        //     newT = newT +  ' ' + months.toString() +  ' ' + this.translate.instant('graph.month')
        //   }
        //   else if (months > 1 && months < 5) {
        //     newT = newT +  ' ' + months.toString() +  ' ' + this.translate.instant('graph.months2-4')
        //   }
        //   else {
        //     newT = newT +  ' ' + months.toString() +  ' ' + this.translate.instant('graph.months5+')
        //   }
        //   duration = duration - (month * months);
        // }
        if (duration > day) {
          days = Math.floor(duration/day);
          newT = newT +  days.toString() + this.translate.instant('graph.d') + ' '
          // if (days == 1) {
          //   newT = newT +  ' ' + days.toString() +  ' ' + this.translate.instant('graph.day')
          // }
          // else if (days > 1 && days < 5) {
          //   newT = newT +  ' ' + days.toString() +  ' ' + this.translate.instant('graph.days2-4')
          // }
          // else {
          //   newT = newT +  ' ' + days.toString() +  ' ' + this.translate.instant('graph.days5+')
          // }
          duration = duration - (day * days);
        }
    
        if (duration > hour) {
          hours = Math.floor(duration/hour);
          newT = newT + hours.toString() +  this.translate.instant('graph.h') + ' '
          // if (hours == 1) {
          //   newT = newT +  ' ' + hours.toString() + ' ' + this.translate.instant('graph.hour')
          // }
          // else if (hours > 1 && hours < 5) {
          //   newT = newT +  ' ' + hours.toString() + ' ' +  this.translate.instant('graph.hours2-4')
          // }
          // else {
          //   newT = newT +  ' ' + hours.toString() + ' ' +  this.translate.instant('graph.hours5+')
          // }
          duration = duration - (hour * hours);
        }
    
        if (duration > minute) {
          minutes = Math.floor(duration/minute);
          newT = newT + minutes.toString() + this.translate.instant('graph.min')
          // if (minutes == 1) {
          //   newT = newT +  ' ' + minutes.toString() +  ' ' + this.translate.instant('graph.minute')
          // }
          // else if (minutes > 1 && minutes < 5) {
          //   newT = newT +  ' ' + minutes.toString() +  ' ' + this.translate.instant('graph.minutes2-4')
          // }
          // else {
          //   newT = newT +  ' ' + minutes.toString() +  ' ' + this.translate.instant('graph.minutes5+')
          // }
          duration = duration - (hour * hours);
        } 
        return newT
      }

      getData() {
        let data = []
        for (const record of this.data) {
            if (record.name) {
                data.push(record.name, record.url)
            }
        }
        return data;
      }
}