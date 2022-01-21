import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  data: any[] = [];
  direction = 'desc-pages_all';
  filteredData: any[] = this.data;
  filter: string = '';

  constructor(public dataService: DataService,
              public translate: TranslateService) {
    this.data = dataService.data;
    this.filteredData = this.data.filter(p => p.name.includes(this.filter))
    console.log(this.filteredData);
  }
  
  filterMe(filter:string) {
    this.filteredData = this.data.filter(record => record.name.toLowerCase().includes(filter))
  }

  onCellClicked(value: any) {
    console.log("clicked cell: ", value, this.direction)
    if (this.direction === "asc-"+value) {
      this.direction = 'desc-'+value;
    } else if (this.direction === "desc-"+value) {
      this.direction = "asc-"+value;
    } else {
      this.direction = 'desc-'+value;
    }
    this.onSortChanged(value); 
  }

  onSortChanged(value:string) {
    console.log("clicked cell: ", value, this.direction);
    // if ((this.direction === 'asc-'+value) || (this.direction === 'desc-'+value)) {
      if ((value === "name") || 
          (value === "name_en") || 
          (value === "url") ||
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
        this.filteredData.sort((a,b) => (b[value] - a[value]) * (this.direction == 'asc-'+value ? -1 : 1))
      }
    // }
    // else {
    //   this.data.sort((a,b) => (b["id"] - a["id"]) * -1)
    // }
  }
  
  ngOnInit(): void {
    this.onSortChanged('pages_all');
  }

}
