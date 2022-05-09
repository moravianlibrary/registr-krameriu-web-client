import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Record } from '../models/record.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { TranslateService } from '@ngx-translate/core';

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
  days: number;

  constructor(private route: ActivatedRoute, 
              public dataService: DataService, 
              private http: HttpClient,
              public translate: TranslateService) { 
  }

  setDetail(data:any) {
    this.detail = data;
    // console.log('detail: ', this.detail)
  }

  toggleExpandIntro() {
    this.intro = !this.intro;
  }
  toggleExpandPrivate() {
    this.private = !this.private;
  }
  getDiffDays(sDate:any, eDate:any) {
    var startDate = new Date(sDate);
    var endDate = new Date(eDate);
  
    var Time = endDate.getTime() - startDate.getTime();
    return Time / (1000 * 3600 * 24);
  }
  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      // console.log(params);
      const code = params['code']; 
      this.code = code;
      this.record = this.dataService.getRecordByCode(code);
      // console.log(this.record)
      this.http.get(this.baseUrl + '/libraries/' + this.code).subscribe((data: any) => {
        this.setDetail(data);
        this.days = this.getDiffDays(this.detail['updated_at'], Date.now())
        this.loading = false;
      });
      
    });
    
  }
}
