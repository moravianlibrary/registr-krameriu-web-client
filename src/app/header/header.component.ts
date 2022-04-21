import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  displayLanguage: string = "English";
  isExpanded: boolean = false;
  constructor(public translate: TranslateService) { 

  }

  ngOnInit(): void {
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    //console.log(this.isExpanded)
  }

  toggleLanguage() {
    let lang = '';
    if (this.translate.currentLang == 'cs') {
      lang = 'en';
      this.displayLanguage = "Čeština"
    } else {
      lang = 'cs';
      this.displayLanguage = "English"
    }
    this.translate.use(lang);
    localStorage.setItem('app.lang', lang);
  }

}
