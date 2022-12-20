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

    private convertToCSV(objArray: any, columns: string[]) {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        for (const obj of array) {
            let line = '';
            for (const col of columns) {
            if (line !== '') {
                line += ',';
            }
            let item = obj[col];
            if (typeof item === 'boolean') {
                line += '\"' + (item ? 'Ano' : 'Ne') + '\"';
            } else if (typeof item === 'string') {
                if (!item || item === '') {
                item = '';
                }
                line += '\"' + item.replace(/\"/g, '""') + '\"';
            } else if (typeof item !== undefined && item != null) {
                line += item;
            }
            }
            str += line + '\r\n';
        }
    return str;
    }
    
    private exportCSVFile(headers: any, columns: any, items: any, fileTitle: any) {
        let csv = '';
        if (headers) {
            csv = '"' + headers.join('","') + '"' + '\r\n';
        }
        const jsonObject = JSON.stringify(items);
        csv += this.convertToCSV(jsonObject, columns);
        const fileName = fileTitle + '.csv' || 'export.csv';
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    
    // Příklad použití 
    public downloadTableAsCSV(data: any[]) { // data - pole objektů (objekt = řádek v tabulce = záznam o Krameriovi)
        const colNames = ['Název', 
                          'Logo', 
                          'Kód', 
                          'Stav', 
                          'Kramerius-API', 
                          'Verze', 
                          'Kramerius-klient', 
                          'Verze', 
                          'Sbírky', 
                          'Tituly - vše', 
                          'Tituly - veřejné', 
                          'Strany - vše', 
                          'Strany - veřejné', 
                          'Doporučené - vše', 
                          'Doporučené - veřejné', 
                          'Knihy - vše', 
                          'Knihy - veřejné', 
                          'Periodika - vše', 
                          'Periodika - veřejné', 
                          'Zvukové nahrávky - vše', 
                          'Zvukové nahrávky - veřejné', 
                          'Mapy - vše', 
                          'Mapy - veřejné', 
                          'Grafiky - vše', 
                          'Grafiky - veřejné', 
                          'Hudebniny - vše', 
                          'Hudebniny - veřejné', 
                          'Archiválie - vše', 
                          'Archiválie - veřejné', 
                          'Rukopisy - vše', 
                          'Rukopisy - veřejné', 
                          'Články - vše', 
                          'Články - veřejné', 
                          'Čísla periodika - vše', 
                          'Čísla periodika - veřejné',
                          'Přílohy - vše', 
                          'Přílohy - veřejné',
                          'Ročníky periodika - vše', 
                          'Ročníky periodika - veřejné',
                          'Monographunit - vše',
                          'Monographunit - veřejné',  
                          'Track - vše',
                          'Track - veřejné',
                          'Soundunit - vše',
                          'Soundunit - veřejné',
                          'Internalpart - vše',
                          'Internalpart - veřejné',
                          'Konvoluty - vše',
                          'Konvoluty - veřejné', 
                          'Obrázky - vše',
                          'Obrázky - veřejné',
                          'DNNTO',
                          'Poslední přírůstek']; // Názvy sloupců v CSV
        const colIds = ['name', 
                        'logo', 
                        'code', 
                        'alive', 
                        'url', 
                        'version', 
                        'new_client_url', 
                        'new_client_version', 
                        'collections', 
                        'documents_all', 
                        'documents_public', 
                        'pages_all', 
                        'pages_public', 
                        'recommended_all', 
                        'recommended_public', 
                        'model_monograph_all', 
                        'model_monograph_public', 
                        'model_periodical_all', 
                        'model_periodical_public', 
                        'model_soundrecording_all', 
                        'model_soundrecording_public', 
                        'model_map_all', 
                        'model_map_public', 
                        'model_graphic_all', 
                        'model_graphic_public', 
                        'model_sheetmusic_all', 
                        'model_sheetmusic_public', 
                        'model_archive_all', 
                        'model_archive_public', 
                        'model_manuscript_all', 
                        'model_manuscript_public', 
                        'model_article_all', 
                        'model_article_public', 
                        'model_periodicalitem_all', 
                        'model_periodicalitem_public',
                        'model_supplement_all', 
                        'model_supplement_public',
                        'model_periodicalvolume_all', 
                        'model_periodicalvolume_public',
                        'model_monographunit_all', 
                        'model_monographunit_public',
                        'model_track_all', 
                        'model_track_public',
                        'model_soundunit_all', 
                        'model_soundunit_public',
                        'model_internalpart_all', 
                        'model_internalpart_public',
                        'model_convolute_all', 
                        'model_convolute_public',
                        'model_picture_all', 
                        'model_picture_public',
                        'dnnto',
                        'last_document_at']; // Klíče objektu
        this.exportCSVFile(colNames, colIds, data, 'registr_data');
    }
}