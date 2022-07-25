import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
// Importing classes and services
import { WeatherService } from '../../Services/weather.service';
import { Ciudad } from '../../Models/Ciudades';
import { Weather, ConsultW } from '../../Models/Weather';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public spanish = true; // Language variable
  public listCities: Ciudad[]; // City list of city Class
  public dataWeather: Weather; // Data of weather
  public cityForm: FormGroup; // Form of select city
  public mapWeather = new Map<string,ConsultW>(); // Dictionary to save data
  public dateCurrrent: number; // number of miliseconds to compare the date
 
  constructor(
    public translate: TranslateService,
    public _servWeather: WeatherService
  ) {
    translate.addLangs(['es', 'en']); // languages
    translate.setDefaultLang('es');  // Select spanish as main language
    this.cityForm = new FormGroup ({  // Build the form
      'dropdownCity': new FormControl('', Validators.required)
    });
  } 

  ngOnInit(): void {
 
    if(localStorage.length == 0) { // initialize the localstorage
      localStorage.mapW = JSON.stringify(Array.from(this.mapWeather.entries()));
    }
    this.mapWeather = new Map(JSON.parse(localStorage.mapW)); // Assign the local storage to the variable
    this.fillCities(); // fill list of cities  
  }


  // Function to fill data
  fillCities() {
    this.listCities = this._servWeather.getCiudades(); // we call the service to bring the list of citys
  }

  fillWeather(city, lang) {
    // console.log(this.mapWeather.get(city+lang).ConsultTime);
    let dateCompar = new Date();
    if (!this.mapWeather.has(city+lang)) { // check if we have the data before making a request to the API
      this._servWeather.getWeatherData(city,lang).subscribe(  // we bring the data of the API
        data => {
          let date = new Date();
          this.dateCurrrent = date.getTime();
          this.dataWeather = data;  // assign the data to a variable
          let consult: ConsultW =  {  // create the object
            ValueCity: this.dataWeather,
            ConsultTime: this.dateCurrrent
          };
          this.mapWeather.set(city+lang, consult); // add the data to the Map
          localStorage.mapW = JSON.stringify(Array.from(this.mapWeather.entries())); // save in localStorage
        },
        err => {
          console.log(err);
        }
      );     
    } else if ((this.mapWeather.get(city+lang).ConsultTime + 600000) < dateCompar.getTime()){ // if time past at least 10 minutes you can get a new value
      this._servWeather.getWeatherData(city,lang).subscribe(  // we bring the data of the API
        data => {
          let date = new Date();
          this.dateCurrrent = date.getTime();
          this.dataWeather = data;  // assign the data to a variable
          let consult: ConsultW =  { // create the object
            ValueCity: this.dataWeather,
            ConsultTime: this.dateCurrrent
          };
          this.mapWeather.delete(city+lang) // delete the previous record
          this.mapWeather.set(city+lang, consult); // add the new data to the Map
          localStorage.mapW = JSON.stringify(Array.from(this.mapWeather.entries())); // save in localStorage
        },
        err => {
          console.log(err);
        }
      );  
    } else {
      this.dataWeather = this.mapWeather.get(city+lang).ValueCity;  // assign the vaule of the Map to the variable
    }


  }

  bringWeather() {  // When the Select change this function is executed
    let cityValue = this.cityForm.controls["dropdownCity"].value;  // Obtain the vaule
    let lang = this.translate.currentLang  // obtain the lang value
    if (lang == undefined || lang == null) {
      lang = "es";
    }
    this.fillWeather(cityValue, lang);  // call the function
  }

  
  // Function to change language
  useLanguage(lg: string) {
    let cityValue = this.cityForm.controls["dropdownCity"].value; // obtain de select Value
    this.translate.use(lg); // Change the language
    if (lg == 'es') {
      this.spanish = true;
    } else {
      this.spanish = false; 
    }

    if (cityValue != "" && cityValue != undefined && cityValue != null) {
      this.fillWeather(cityValue, lg); 
    }
  }

}
