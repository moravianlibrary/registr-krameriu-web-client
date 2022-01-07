import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  data: any[] = [];
  direction = 'asc-name';

  constructor(public dataService: DataService) {
    this.data = this.dataService.data;
    console.log(this.dataService.data);
    
  }

  onCellClicked(value: any) {
    console.log("clicked cell: ", value, this.direction)
    if (this.direction === "asc-"+value) {
      this.direction = 'desc-'+value;
    } else if (this.direction === "desc-"+value) {
      this.direction = "asc-"+ value;
    } else {
      this.direction = 'desc-'+value;
    }
    this.onSortChanged(value); 
  }

  onSortChanged(value:string) {
    console.log("clicked cell: ", value, this.direction);
    if ((this.direction === 'asc-'+value) || (this.direction === 'desc-'+value)) {
      if (value === "id") {
        this.data.sort((a,b) => (b["id"] - a["id"]) * (this.direction == 'desc-'+value ? -1 : 1))
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
          return x.localeCompare(y) * (this.direction == 'desc-'+value ? -1 : 1);
        })
      }
    }
    else {
      this.data.sort((a,b) => (b["id"] - a["id"]) * -1)
    }
  }
  
  ngOnInit(): void {
    this.onSortChanged('name');
  }

}
