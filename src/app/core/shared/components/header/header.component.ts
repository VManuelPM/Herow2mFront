import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  languages = [
    { value: 'en', viewValue: 'English' },
    { value: 'es', viewValue: 'Español' },
  ];
  selectedLanguages = this.languages[0].value;

  @Input() sidenav!: MatSidenav;

  constructor(private readonly translateService: TranslateService) {
    translateService.setDefaultLang('en');
  }

  ngOnInit(): void {}

  switchLang(lang: string) {
    console.log(lang);
  }

  selectLanguage(event: any) {
    let lang = event.value;
    this.translateService.use(lang);
  }
}
