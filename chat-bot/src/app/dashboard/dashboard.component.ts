import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  bookingForm:FormGroup;

  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      fromItem: [null,Validators.required],
      toItem:[null,Validators.required],
      fromDate: [new Date(), Validators.required],
      toDate: [new Date(), Validators.required],
    });
  }
  onSubmit() {
    const fromItemValue = this.bookingForm.get('fromItem').value;
    const toItemValue = this.bookingForm.get('toItem').value;
  
    // Check if values are not null or undefined
    if (fromItemValue && toItemValue) {
      const url = `https://www.google.com/search?q=flights+from+${fromItemValue}+to+${toItemValue}`;
      window.open(url, "_blank");
    }
  }

  isFormDisabled(): boolean {
    const fromItemValue = this.bookingForm.get('fromItem').value;
    const toItemValue = this.bookingForm.get('toItem').value;
  
    return !fromItemValue || !toItemValue;
  }
}
