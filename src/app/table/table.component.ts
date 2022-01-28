import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../services/data.service';

import { Record } from '../models/record.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  
  data: Record[] = [];
  direction = 'desc-documents_all';
  value = 'documents_all';
  filteredData: Record[] = [];
  filter: string = '';
  viewAllCols: boolean = false;
  viewSomeCols: boolean = true;
  viewTechCols: boolean = false;
  viewStatCols: boolean = false;
  view: number = 0;
  display: number = 0;
  display_all: boolean = true;
  display_public: boolean = false;
  display_both: boolean = false;
  selectedView: 'some';

  constructor(public dataService: DataService,
              public translate: TranslateService) {
    this.data = dataService.data;
    this.filteredData = this.data.filter(p => p.name.includes(this.filter))
    console.log(this.filteredData);
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((value) => {

      console.log('new lang', value.lang);
      this.onSortChanged();
    });

    this.onSortChanged();
  }
  
  filterMe(filter:string) {
    this.filteredData = this.data.filter(record => record.name.toLowerCase().includes(filter.toLowerCase()))
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
  }
  displayPublic() {
    this.display_all = false;
    this.display_public = true;
    this.display_both = false;
    this.display = 1;
  }
  displayBoth() {
    this.display_all = false;
    this.display_public = false;
    this.display_both = true;
    this.display = 2;
  }

  onCellClicked(value: any) {
    console.log("clicked cell: ", value, this.display_public, this.direction)
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

  onSortChanged() {
    // console.log("clicked cell: ", this.value, this.direction);
    const value = this.value;
    // if ((this.direction === 'asc-'+value) || (this.direction === 'desc-'+value)) {
      if (value === "name") {
            this.filteredData.sort((a,b) => {
              let x = "";
              let y = "";
              if (a.getTitleForLanguage(this.translate.currentLang) && a.getTitleForLanguage(this.translate.currentLang).length > 0) {
                x = a.getTitleForLanguage(this.translate.currentLang);
              }
              if (b.getTitleForLanguage(this.translate.currentLang) && b.getTitleForLanguage(this.translate.currentLang).length > 0) {
                y = b.getTitleForLanguage(this.translate.currentLang);
              }
              return x.localeCompare(y) * (this.direction == 'desc-'+value ? -1 : 1);
            })
      } else if ((value === "url") ||
          (value === "new_client_url") ||
          (value === "version")
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
              return x.localeCompare(y) * (this.direction == 'desc-'+value ? -1 : 1);
            })
      }
      else if (value === "alive") {
      this.filteredData.sort((a,b)=> ((a[value]===b[value])?0 :(a[value]===true)?1:-1) * (this.direction == 'asc-'+value ? -1 : 1)) 
      }
      else {
        this.filteredData.sort((a,b) => ((<any>b)[value] - (<any>a)[value]) * (this.direction == 'asc-'+value ? -1 : 1))
      }
    // }
    // else {
    //   this.data.sort((a,b) => (b["id"] - a["id"]) * -1)
    // }
  }
  

}
