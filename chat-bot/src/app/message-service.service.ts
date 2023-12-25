import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  private apiUrl = 'http://127.0.0.1:5000'; // Update with your Flask server URL (For calling old backend)

  private weatherApi = 'https://api.openweathermap.org/data/2.5/forecast?q=delhi&appid=dc0311740a9e15744a61eddb2ca9cdc1&units=metric';
  //'http://api.openweathermap.org/data/2.5/forecast?lat=28.70&lon=77.10&appid=dc0311740a9e15744a61eddb2ca9cdc1'
  // private apiUrl = 'https://abcde1234.azurewebsites.net';
  //https://api.openweathermap.org/data/2.5/forecast?q=delhi&appid=dc0311740a9e15744a61eddb2ca9cdc1&mode=xml&units=metric

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/data`);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/predict`, data);
  }

  getWeatherData(): Observable<any> {
    return this.http.get(`${this.weatherApi}`);
  }

  getJsonData(dataURL): Observable<any> {
    return this.http.get<any>(dataURL);
  }

}





///////////////////////////////////////////
export class ChatbotService {
  constructor(private http: HttpClient) { }

  sendQuestion(question: string) {
    const url = 'http://127.0.0.1:5000';
    return this.http.post(url, { question });
  }
}
