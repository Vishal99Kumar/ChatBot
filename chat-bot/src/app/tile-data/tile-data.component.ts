import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../data-share.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tile-data',
  templateUrl: './tile-data.component.html',
  styleUrls: ['./tile-data.component.scss']
})
export class TileDataComponent implements OnInit {
  test:any;
  dateControl = new FormControl();
  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  tileClicked:string;
  form:FormGroup;


  constructor(private dataService: DataShareService,
    private fb: FormBuilder){}

  ngOnInit(): void {
    this.dataService.internalTile.subscribe((res)=>{
      this.tileClicked = res;
    })

    this.form = this.fb.group({
      lostItem: ['', Validators.required],
      lostDate: [null, Validators.required],
      selectedOption: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Perform actions with the form data
      console.log(this.form.value);
    }
  }

}
