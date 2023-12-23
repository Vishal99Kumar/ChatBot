import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../data-share.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-looking-for',
  templateUrl: './looking-for.component.html',
  styleUrls: ['./looking-for.component.scss']
})
export class LookingForComponent implements OnInit {
  shouldHeaderClose:boolean = false;

  constructor(private dataService: DataShareService,
    public dialog: MatDialogRef<LoginComponent>){}

  ngOnInit(): void {
    this.dataService.closeHeaderPage.subscribe((res)=>{
      this.shouldHeaderClose = res;
    })
  }

  TileClick(value:string)
  {
    if(this.shouldHeaderClose)
    {
    this.dialog.close();
    }
    switch(value)
    {
      case "Status":
        this.dataService.updateInternalVariable("Status");
        break;
      case "Lost":
        this.dataService.updateInternalVariable("Lost");
        break;
      case "Waiting":
        this.dataService.updateInternalVariable("Waiting");
        break;
      case "Cab":
        this.dataService.updateInternalVariable("Cab");
        break;
      case "Immigration":
        this.dataService.updateInternalVariable("Immigration");
        break;
      case "Cargo":
        this.dataService.updateInternalVariable("Cargo");
        break;
      case "Parking":
        this.dataService.updateInternalVariable("Parking");
        break;
      case "Cafes":
        this.dataService.updateInternalVariable("Cafes");
        break;
      case "Medical":
        this.dataService.updateInternalVariable("Medical");
        break;
      case "Weather":
        this.dataService.updateInternalVariable("Weather");
        break;
      default:
        window.open("https://www.google.com", "_blank");
        break;              
    }
  }
}
