import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from 'src/app/message-service.service';
import { DatePipe } from '@angular/common';

interface WeatherDataInterface {
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
  realFeel: number;
  humidity: number;
  pressure: number;
  wind: number;
  icon: string;
  city: string;
  dateTime: string;
  forecast: string;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherDataApi: any;
  weatherData: WeatherDataInterface = {} as WeatherDataInterface;
  city: any;
  dateShown: any;

  constructor(private weatherService: MessageServiceService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.weatherService.getWeatherData().subscribe((res) => {
      this.weatherDataApi = res.list;
      this.city = res.city.name;
      this.dateShown = this.datePipe.transform(new Date(), 'fullDate');
      // Get the current datetime string
      const currentDatetimeString = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

      // Parse current datetime
      const currentDatetime = new Date(currentDatetimeString);

      // Find the closest timestamp in the API data
      const closestTimestamp = this.weatherDataApi.reduce((closest, data) => {
        const dataTimestamp = new Date(data.dt_txt);
        const closestTimestampDiff = Math.abs(currentDatetime.getTime() - new Date(closest.dt_txt).getTime());
        const dataTimestampDiff = Math.abs(currentDatetime.getTime() - dataTimestamp.getTime());

        return dataTimestampDiff < closestTimestampDiff ? data : closest;
      });

      // Get the temperature for the closest timestamp
      this.weatherData.temperature = closestTimestamp.main.temp;
      this.weatherData.minTemperature = closestTimestamp.main.temp_min;
      this.weatherData.maxTemperature = closestTimestamp.main.temp_max;
      this.weatherData.realFeel = closestTimestamp.main.feels_like;
      this.weatherData.humidity = closestTimestamp.main.humidity;
      this.weatherData.pressure = closestTimestamp.main.pressure;
      this.weatherData.wind = closestTimestamp.wind.speed;
      this.weatherData.icon = "https://openweathermap.org/img/w/" + closestTimestamp.weather[0].icon + ".png";
      this.weatherData.city = this.city;
      this.weatherData.dateTime = this.dateShown;
      const capitalizedDescription = this.capitalizeFirstLetter(closestTimestamp.weather[0].description);
      this.weatherData.forecast = capitalizedDescription;
    })
  }


  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
