import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../Models/Ciudades';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public listCiudades: Ciudad[] = [
    {
      Name: "Cancún",
      NameValue:"Canc%C3%BAn"
    },
    {
      Name: "Guadalajara",
      NameValue:"guadalajara"
    },
    {
      Name: "Hermosillo",
      NameValue:"hermosillo"
    },
    {
      Name: "Irapuato",
      NameValue:"irapuato"
    },
    {
      Name: "Mazatlán",
      NameValue:"Mazatl%C3%A1n"
    },
    {
      Name: "Mérida",
      NameValue:"M%C3%A9rida"
    },
    {
      Name: "Mexicali",
      NameValue:"mexicali"
    },
    {
      Name: "Monterrey",
      NameValue:"monterrey"
    },
    {
      Name: "Puerto Vallarta",
      NameValue:"puerto%20vallarta"
    },
    {
      Name: "Saltillo",
      NameValue:"saltillo"
    },
    {
      Name: "Tijuana",
      NameValue:"tijuana"
    }
  ];

  constructor(private _http: HttpClient) { }

  public getWeatherData(): Observable<any> {
    return this._http.get<any>(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/guadalajara?unitGroup=metric&include=current&key=59A7RJPTJUTLR79VAU6QD6YQH&contentType=json`);
  }

  public getCiudades() {
    return this.listCiudades;
  }

}
