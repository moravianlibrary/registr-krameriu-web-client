import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public translate: TranslateService) { 

  }

  ngOnInit(): void {
  }

  toggleLanguage() {
    let lang = '';
    if (this.translate.currentLang == 'cs') {
      lang = 'en';
    } else {
      lang = 'cs';
    }
    this.translate.use(lang);
    localStorage.setItem('app.lang', lang);
  }

}
