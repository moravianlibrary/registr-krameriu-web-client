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
  about: boolean = true;
  statistics: boolean = false;
  digidata:boolean = false;
  graph: boolean = false;
  display: number = 1;
  history: any;
  knihovnycz_link: string;


  constructor(private route: ActivatedRoute, 
              public dataService: DataService, 
              private http: HttpClient,
              public translate: TranslateService) { 
  }
  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      // console.log(params);
      const code = params['code']; 
      this.code = code;
      this.record = this.dataService.getRecordByCode(code);
      this.http.get(this.baseUrl + '/libraries/' + this.code).subscribe((data: any) => {
        this.setDetail(data);
        this.days = this.getDiffDays(this.detail['updated_at'], Date.now())
        this.loading = false;
      });
      this.http.get(this.baseUrl + '/libraries/' + this.code + '/history').subscribe((history:any) => {
        this.setHistory(history);
        // console.log(history)
      })
      if (this.record.sigla) {
        this.http.get('https://www.knihovny.cz/api/v1/libraries/search?lookfor=' + this.record.sigla + '&type=Sigla&sort=relevance&page=1&limit=20&prettyPrint=false&lng=cs').subscribe((knihovnycz:any) => {
          this.knihovnycz_link = 'https://www.knihovny.cz/LibraryRecord/' + knihovnycz.records[0].id
          console.log(this.knihovnycz_link)
        })
      }
    });
    
  }
  
  showAbout() {
    this.about = true;
    this.statistics = false;
    this.digidata = false;
    this.graph = false;
    this.display = 1;
  }
  showStatistics() {
    this.about = false;
    this.statistics = true;
    this.digidata = false;
    this.graph = false;
    this.display = 2;
  }
  showDigidata() {
    this.about = false;
    this.statistics = false;
    this.digidata = true;
    this.graph = false;
    this.display = 3;
  }
  showGraph() {
    this.about = false;
    this.statistics = false;
    this.digidata = false;
    this.graph = true;
    this.display = 4;
  }

  setDetail(data:any) {
    this.detail = data;
    // console.log('detail: ', this.detail)
  }

  setHistory(history:any) {
    this.history = history;
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
  
}
