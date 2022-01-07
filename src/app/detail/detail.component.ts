import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Record } from '../services/record.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  loading: boolean;
  baseUrl = environment.baseUrl;
  record: Record;
  detail: any;
  code: string;
  intro: boolean = false;
  private: boolean = false;

  constructor(private route: ActivatedRoute, 
              public dataService: DataService, 
              private http: HttpClient) { 
  }

  setDetail(data:any) {
    this.detail = data;
    console.log('detail: ', this.detail)
  }

  toggleExpandIntro() {
    this.intro = !this.intro;
  }
  toggleExpandPrivate() {
    this.private = !this.private;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      const code = params['code']; 
      this.code = code;
      this.record = this.dataService.getRecordByCode(code);
      console.log(this.record)
    });

    this.loading = true;
    this.http.get(this.baseUrl + '/libraries/' + this.code + '.json').subscribe((data: any) => {
      this.setDetail(data);
      this.loading = false;
    });

    
  }
}
