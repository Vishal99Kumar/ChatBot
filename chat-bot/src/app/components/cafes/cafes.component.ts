import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from 'src/app/message-service.service';

@Component({
  selector: 'app-cafes',
  templateUrl: './cafes.component.html',
  styleUrls: ['./cafes.component.scss']
})
export class CafesComponent implements OnInit {
url = "../../../assets/jsonData/Restaurants_Cafes_json.json";
data:any;
  constructor(private Service: MessageServiceService){}
  ngOnInit(): void {
    this.Service.getJsonData(this.url).subscribe((res)=>{this.data = res;})
  }

}
