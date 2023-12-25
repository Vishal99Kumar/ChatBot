import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-status',
  templateUrl: './flight-status.component.html',
  styleUrls: ['./flight-status.component.scss']
})
export class FlightStatusComponent implements OnInit {
  statusForm:FormGroup;
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.statusForm = this.fb.group({
      State: ['Arrival'],
      type: ['International'],
      SearchValue: [null],
      selectedOption: ['all'],
    });
  }

  // toggletype(value){

  // }
  togglestatus(value){
    if(value === 'Departure')
    {
      this.statusForm.patchValue({
        State: value,
      });
    }
    else{
      this.statusForm.patchValue({
        State: value,
      });
    }
  }
  onSubmit(){
    console.log(this.statusForm.value);
  }
  onExtraClick(){}
}
