import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {
  Steps:string = "First";
  parkingForm:FormGroup;
  isShowTable:boolean = false;
  minDate:any;
  duration:any;
  showCheckinHour:any;
  showCheckOutHour:any;
  cost:any;

  constructor(private fb: FormBuilder){this.minDate = new Date();}

  ngOnInit(): void {
    this.parkingForm = this.fb.group({
      Terminal: ['Terminal 3'],
      type: ['Domestic'],
      checkinDate: [null, Validators.required],
      checkInTime: [null, Validators.required],
      Inampm: ['PM'],
      checkOutDate: [null, Validators.required],
      Outampm: ['PM'],
      checkOutTime: [null, Validators.required],
    });
  }

  nextStep(value){
    this.Steps = value;
    this.isShowTable = false;
  }

  toggleTyped() {
    this.parkingForm.patchValue({
      type: 'Domestic',
    });
  }

  toggleTypei() {
    this.parkingForm.patchValue({
      type: 'International',
    });
  }

  toggleCheck(value){
    this.parkingForm.patchValue({
      checkInTime: value,
    });
  }

  toggleInAMPM(value) {
    this.parkingForm.patchValue({
      Inampm: value,
    });
  }

  toggleOutAMPM(value) {
    this.parkingForm.patchValue({
      Outampm: value,
    });
  }

  toggleCheckOut(value){
    this.parkingForm.patchValue({
      checkOutTime: value,
    });
  }

  onSubmit(){
    //console.log(this.parkingForm.value);
    const checkInDateTime = new Date(this.parkingForm.value.checkinDate);
  const checkOutDateTime = new Date(this.parkingForm.value.checkOutDate);

  // Set hours for check-in and check-out
  checkInDateTime.setHours(this.getAMPMHours(this.parkingForm.value.Inampm, this.parkingForm.value.checkInTime));
  checkOutDateTime.setHours(this.getAMPMHours(this.parkingForm.value.Outampm, this.parkingForm.value.checkOutTime));

  // Calculate the duration in milliseconds
  const durationInMilliseconds = checkOutDateTime.getTime() - checkInDateTime.getTime();

  // Convert duration to hours
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

  // Set the duration value to display
  this.duration = durationInHours.toFixed(2);
  this.showCheckinHour = this.getAMPMHours(this.parkingForm.value.Inampm, this.parkingForm.value.checkInTime);
  this.showCheckOutHour = this.getAMPMHours(this.parkingForm.value.Outampm, this.parkingForm.value.checkOutTime);
    this.cost = this.duration*15;
  }

  getAMPMHours(ampm: string, hours: number): number {
    if (ampm === 'AM') {
      return hours % 12;
    } else {
      return (hours % 12) + 12;
    }
  }

  onExtraClick(){
    console.log("called");
    this.isShowTable = true;
  }
}
