import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
// Importing classes and services
import { WeatherService } from '../../Services/weather.service';
import { Ciudad } from '../../Models/Ciudades';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public spanish = true; // Language variable
  public listCities: Ciudad[]; // City list of city Class
  public dataWeather: any; // Data of weather
  public cityForm: FormGroup; // Form of select city
  
  constructor(
    public translate: TranslateService,
    public _servWeather: WeatherService
  ) {
    translate.addLangs(['es', 'en']); // languages
    translate.setDefaultLang('es');  // Select spanish as main language
    this.cityForm = new FormGroup ({
      'dropdownCity': new FormControl('', Validators.required)
    });
  } 

  ngOnInit(): void {
    this.fillCities(); // fill list of cities
    // this._servWeather.getWeatherData().subscribe(
    //   data => {
    //     this.dataWeather = data;
    //     console.log(this.dataWeather);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }


  // Function to fill data
  fillCities() {
    this.listCities = this._servWeather.getCiudades();
    console.log(this.listCities);
  }

  bringWeather() {
    let cityValue = this.cityForm.controls["dropdownCity"].value;
    console.log(cityValue);
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
