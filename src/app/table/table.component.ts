import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../services/data.service';

import { Record } from '../models/record.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewChecked {
  
  data: Record[] = [];
  direction = '';
  value = '';
  selectedView = 'all';
  filteredData: Record[] = [];
  filter: string = '';
  viewAllCols: boolean = true;
  viewSomeCols: boolean = false;
  viewTechCols: boolean = false;
  viewStatCols: boolean = false;
  view: number = 1;
  display: number = 0;
  display_all: boolean = true;
  display_public: boolean = false;
  display_both: boolean = false;

  baseUrl = environment.baseUrl;
  

  constructor(public dataService: DataService,
              public translate: TranslateService,
              private cdr: ChangeDetectorRef,
              private http: HttpClient) {
    this.data = dataService.data;
    this.filteredData = this.data.filter(p => p.name.includes(this.filter))
    // console.log(this.dataService.getData())
    // console.log(this.filteredData);
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((value) => {
      // console.log('new lang', value.lang);    
      this.filter = ''
      this.filteredData = this.data.filter(p => p.name.includes(this.filter)); 
      this.onSortChanged();
    });
    this.direction = 'desc-pages_all';
    this.value = 'pages_all';
    this.selectedView = 'all';
    this.onSortChanged();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  getAliveTime(code: string) {
    console.log(code)
    // this.http.get(this.baseUrl + '/libraries/' + code + '/states?int=1y' ).subscribe((data: any) => { 
    //   console.log(data.from)
    // }
    // )
    return code;
  }
  
  filterMe(filter: string) {
    if (this.translate.currentLang == 'cs') {
      this.filteredData = this.data.filter(record => {
        return (
          record.name.toLowerCase().includes(filter.toLowerCase()) ||
          record.code.toLowerCase().includes(filter.toLowerCase())
        );
      })
      // this.filteredData.map(record => {
      //   return (
      //     record.name.replace(new RegExp(filter, "gi"), (match) => match.toUpperCase())
      //   );
      // })
    } else {
      this.filteredData = this.data.filter(record => {
        return (
          record.name_en.toLowerCase().includes(filter.toLowerCase()) ||
          record.code.toLowerCase().includes(filter.toLowerCase())
          // record.url.toLowerCase().includes(filter.toLowerCase())
        );
      })
    }
    
    // if (filter.length > 0) {
    //   this.filteredData.map(record => {
    //     record.name.replace(new RegExp(filter, "gi"), (match) => match.toUpperCase())
    //     return record;})
    // }
    // console.log(filter)
    
    // this.filteredData.forEach(record => {
    //   record.name.replace(new RegExp(filter, "gi"), (match) => match.toUpperCase())
    //   return record;})
    
    // for (const record of this.filteredData) {
    //   console.log((record.name).replace(new RegExp(filter, "gi"), (match) => {
    //     return match.toUpperCase();
    //   }));
    //   (record.name).replace(new RegExp(filter, "gi"), (match) => {
    //     return match.toUpperCase();
    //   })
    // }
    this.onSortChanged();
  }

  viewSome() {
    this.viewSomeCols = true;
    this.viewAllCols = false;
    this.viewStatCols = false;
    this.viewTechCols = false;
    this.view = 0;
  }
  viewAll() {
    this.viewSomeCols = false;
    this.viewAllCols = true;
    this.viewStatCols = false;
    this.viewTechCols = false;
    this.view = 1;
  }
  viewTechnicInfo() {
    this.viewSomeCols = false;
    this.viewAllCols = false;
    this.viewStatCols = false;
    this.viewTechCols = true;
    this.view = 2;
  }
  viewStaticticInfo() {
    this.viewSomeCols = false;
    this.viewAllCols = false;
    this.viewStatCols = true;
    this.viewTechCols = false;
    this.view = 3;
  }
  displayAll() {
    this.display_all = true;
    this.display_public = false;
    this.display_both = false;
    this.display = 0;
    this.onDisplayChanged();
  }
  displayPublic() {
    this.display_all = false;
    this.display_public = true;
    this.display_both = false;
    this.display = 1;
    this.onDisplayChanged();
  }
  displayBoth() {
    this.display_all = false;
    this.display_public = false;
    this.display_both = true;
    this.display = 2;
    this.onDisplayChanged();
  }
  onDisplayChanged() {
    if (this.display_public) {
      this.value = this.value.split('_')[0] + '_public' 
      this.direction = this.direction.split('_')[0] + '_public'
      // console.log(this.direction)  
    } else {
      this.value = this.value.split('_')[0] + '_all' 
      this.direction = this.direction.split('_')[0] + '_all'
    }
    this.onSortChanged();
  }

  onCellClicked(value: any) {
    // console.log("clicked cell: ", value, this.display_public, this.direction)
    if (this.direction === "asc-"+value) {
      this.direction = 'desc-'+value;
    } else if (this.direction === "desc-"+value) {
      this.direction = "asc-"+value;
    } else {
      this.direction = 'desc-'+value;
    }
    this.value = value;
    this.onSortChanged(); 
  }
  onDoubleCellClicked(value: any) {
    if (this.display_public) {
      if (this.direction === "asc-"+value+'_public') {
        this.direction = 'desc-'+value+'_public';
      } else if (this.direction === "desc-"+value+'_public') {
        this.direction = "asc-"+value+'_public';
      } else {
        this.direction = 'desc-'+value+'_public';
      }
      this.value = value+'_public';
    }
    else {
      if (this.direction === "asc-"+value+'_all') {
        this.direction = 'desc-'+value+'_all';
      } else if (this.direction === "desc-"+value+'_all') {
        this.direction = "asc-"+value+'_all';
      } else {
        this.direction = 'desc-'+value+'_all';
      }
      this.value = value+'_all';
    }
    this.onSortChanged(); 
  }


  private compareTitles(a: Record, b: Record) {
    let x = "";
    let y = "";
    if (a.getTitleForLanguage(this.translate.currentLang) && a.getTitleForLanguage(this.translate.currentLang).length > 0) {
      x = a.getTitleForLanguage(this.translate.currentLang);
    }
    if (b.getTitleForLanguage(this.translate.currentLang) && b.getTitleForLanguage(this.translate.currentLang).length > 0) {
      y = b.getTitleForLanguage(this.translate.currentLang);
    }
    return x.localeCompare(y) * (this.direction == 'desc-name' ? -1 : 1);
  }

  onSortChanged() {
    // console.log("clicked cell: ", this.value, this.direction);
  const value = this.value;
    if (value === "name") {
          this.filteredData.sort((a,b) => {
            return this.compareTitles(a,b);
          })
    } else if ((value === "url") ||
        (value === "new_client_url") ||
        (value === "version") ||
        (value === "new_client_version") || 
        (value === "code")
        ) {
          this.filteredData.sort((a,b) => {
            let x = "";
            let y = "";
            if (a[value] && a[value].length > 0) {
              x = a[value];
            }
            if (b[value] && b[value].length > 0) {
              y = b[value];
            }
            const d = x.localeCompare(y);
            if (d == 0) {
              return this.compareTitles(a,b);
            }
            return d * (this.direction == 'desc-'+value ? -1 : 1);
          })
    } 
    else if (value === "alive") {
    this.filteredData.sort((a,b)=> ((a[value]===b[value])?0 :(a[value]===true)?1:-1) * (this.direction == 'asc-'+value ? -1 : 1)) 
    }
    else {
      this.filteredData.sort((a,b) => {
        const x = (<any>a)[value];
        const y = (<any>b)[value];
        if (x == null) {
          return 1;
        }
        if (y == null) {
          return -1;
        }
        const d = y - x;
        if (d == 0) {
          return this.compareTitles(a,b);
        }
        return d * (this.direction == 'asc-'+value ? -1 : 1)
      });
    }
  }
}
