import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  // Language variable
  public spanish = true;
  
  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
  } 

  ngOnInit(): void {
  }


  
  // Function to change language
  useLanguage(lg: string) {
    this.translate.use(lg);
    if (lg == 'es') {
      this.spanish = true;
    } else {
      this.spanish = false; 
    }
  }
  dayNight() {
    console.log("cambiar");
  }
}
