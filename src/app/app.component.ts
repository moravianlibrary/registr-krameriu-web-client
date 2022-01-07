import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'registr-krameriu-frontend';
  loading: boolean = true;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private dataService: DataService) {}

  ngOnInit() {
    this.loading = true;
    this.http.get(this.baseUrl + '/libraries.json').subscribe((data: any) => {
      this.dataService.setData(data);
      this.loading = false;
    });
  }
}
