import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  data: any[] = [];
  direction = 'none';

  constructor(public dataService: DataService) {
    this.data = this.dataService.data;
    console.log(this.dataService.data);
  }

  onCellClicked(value: any, direction: any) {
    console.log("clicked cell: ", value, direction)
    if (direction === "none") {
      this.onSortChanged(value, 'asc-'+value);
      this.direction = 'asc-'+value;
    }
    if (direction === "asc-"+value) {
      this.onSortChanged(value, 'desc-'+value);
      this.direction = 'desc-'+value;
    }
    if (direction === "desc-"+value) {
      this.onSortChanged(value, 'none');
      this.direction = 'none'
    }   
  }

  onSortChanged(value:string, direction:string) {
    console.log("clicked cell: ", value, direction);
    if ((direction === 'asc-'+value) || (direction === 'desc-'+value)) {
      if (value === "id") {
        this.data.sort((a,b) => (b["id"] - a["id"]) * (direction == 'desc-'+value ? -1 : 1))
      }
      else {
        this.data.sort((a,b) => {
          let x = "";
          let y = "";
          if (a[value] && a[value].length > 0) {
            x = a[value];
          }
          if (b[value] && b[value].length > 0) {
            y = b[value];
          }
          return x.localeCompare(y) * (direction == 'desc-'+value ? -1 : 1);
        })
      }
    }
    else {
      this.data.sort((a,b) => (b["id"] - a["id"]) * -1)
    }
  }
  
  ngOnInit(): void {
  }

}
