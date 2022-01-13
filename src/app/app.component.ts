import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';
import { environment } from '../environments/environment'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'registr-krameriu-frontend';
  loading: boolean = true;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, 
              private translate: TranslateService, 
              private dataService: DataService) {}

  ngOnInit() {
    this.translate.use('cs');
    // // Pouziti translate v kodu
    // // 1 Asynchronne
    // this.translate.get('table.cols.name').subscribe(a => {
    //   console.log(a);
    // });
    // // 2 synchronne
    // console.log(this.translate.instant('table.cols.name'));
    this.loading = true;
    this.http.get(this.baseUrl + '/libraries').subscribe((data: any) => {
      this.dataService.setData(data);
      this.loading = false;
    });
  }
}
