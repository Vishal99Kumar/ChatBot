import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../data-share.service';

@Component({
  selector: 'app-tile-data',
  templateUrl: './tile-data.component.html',
  styleUrls: ['./tile-data.component.scss']
})
export class TileDataComponent implements OnInit {

  tileClicked:string;
  constructor(private dataService: DataShareService){}

  ngOnInit(): void {
    this.dataService.internalTile.subscribe((res)=>{
      this.tileClicked = res;
    })
  }

}
