import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  libraries: number;
  documents: number;
  documents_public: number;
  pages: number;

  constructor(public dataService: DataService) { 
    this.libraries = dataService.data.length;
    this.documents = dataService.getAllDocCount();
    this.documents_public = dataService.getPublicDocCount();
  }

  ngOnInit(): void {
  }

}
